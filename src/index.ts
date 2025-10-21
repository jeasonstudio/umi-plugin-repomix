import type { IApi } from 'umi';
import { pack, mergeConfigs, type RepomixConfig } from 'repomix';
import * as path from 'path';
import * as fs from 'fs';

export interface RepomixPluginConfig {
  /**
   * 是否启用插件
   * @default true
   */
  enabled?: boolean;
  /**
   * 何时生成文件
   * @default 'buildEnd'
   */
  generateOn?: 'buildStart' | 'buildEnd';
  /**
   * 输出目录
   * @default 'dist'
   */
  outputDir?: string;
  /**
   * Repomix 配置选项
   */
  config?: RepomixConfig;
}

export default (api: IApi) => {
  api.describe({
    key: 'repomix',
    config: {
      schema({ zod }) {
        return zod.object({
          enabled: zod.boolean().optional(),
          generateOn: zod.enum(['buildStart', 'buildEnd']).optional(),
          outputDir: zod.string().optional(),
          config: zod.any().optional(), // RepomixConfig - complex nested schema, use any for simplicity
        });
      },
      default: {
        enabled: true,
        generateOn: 'buildEnd',
        outputDir: 'dist',
      },
    },
  });

  const config: RepomixPluginConfig = api.userConfig.repomix || {};

  // 如果插件被禁用，直接返回
  if (config.enabled === false) {
    return;
  }

  /**
   * 执行 repomix 生成文件
   */
  const generateRepomixFiles = async () => {
    try {
      api.logger.info('[repomix] 开始生成 llms.txt 和 llms-full.txt...');

      const cwd = api.cwd;
      const outputDir = config.outputDir || 'dist';
      const outputPath = path.join(cwd, outputDir);

      // 确保输出目录存在
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      // 构建 repomix 配置
      const llmsOutputPath = path.join(outputPath, 'llms.txt');
      const llmsFullOutputPath = path.join(outputPath, 'llms-full.txt');

      // 合并用户配置和默认配置
      const fileConfig: RepomixConfig = config.config || {};
      const cliConfig = {
        output: {
          filePath: llmsOutputPath,
        },
      };

      const repomixConfig = mergeConfigs(cwd, fileConfig, cliConfig);

      api.logger.info(`[repomix] 生成 llms.txt...`);

      // 生成 llms.txt
      const result1 = await pack([cwd], repomixConfig);

      api.logger.info(
        `[repomix] llms.txt 生成完成: ${result1.totalFiles} 个文件, ${result1.totalCharacters} 个字符, ${result1.totalTokens} tokens`
      );

      // 生成 llms-full.txt (包含更多详细信息)
      const cliFullConfig = {
        output: {
          filePath: llmsFullOutputPath,
          fileSummary: true,
          directoryStructure: true,
          showLineNumbers: true,
          git: {
            includeDiffs: true,
            includeLogs: true,
            includeLogsCount: 10,
          },
        },
      };

      const repomixFullConfig = mergeConfigs(cwd, fileConfig, cliFullConfig);

      api.logger.info(`[repomix] 生成 llms-full.txt...`);

      const result2 = await pack([cwd], repomixFullConfig);

      api.logger.info(
        `[repomix] llms-full.txt 生成完成: ${result2.totalFiles} 个文件, ${result2.totalCharacters} 个字符, ${result2.totalTokens} tokens`
      );

      api.logger.info('[repomix] ✅ 成功生成 llms.txt 和 llms-full.txt');
    } catch (error) {
      api.logger.error('[repomix] ❌ 生成文件失败:');
      if (error instanceof Error) {
        api.logger.error(error.message);
        if (error.stack) {
          api.logger.error(error.stack);
        }
      }
      // 不抛出错误，避免中断构建流程
    }
  };

  // 根据配置决定在何时执行
  if (config.generateOn === 'buildStart') {
    api.onStart(() => {
      generateRepomixFiles();
    });
  } else {
    // 默认在构建完成后执行
    api.onBuildComplete(({ err }) => {
      if (!err) {
        generateRepomixFiles();
      }
    });
  }
};
