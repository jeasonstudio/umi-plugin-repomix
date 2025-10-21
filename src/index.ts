import type { IApi } from 'umi';
import { pack, mergeConfigs, type RepomixConfig } from 'repomix';
import * as path from 'path';
import * as fs from 'fs';

export default (api: IApi) => {
  api.describe({
    key: 'repomix',
    config: {
      schema({ zod }) {
        return zod.union([
          zod.boolean(), // 支持 repomix: false 来禁用
          zod.any(), // RepomixConfig - 复杂的嵌套 schema，使用 any 简化
        ]);
      },
    },
  });

  const userConfig = api.userConfig.repomix;

  // 如果插件被禁用，直接返回
  if (userConfig === false) {
    return;
  }

  /**
   * 执行 repomix 生成文件
   */
  const generateRepomixFiles = async () => {
    try {
      api.logger.info('[repomix] 开始生成 llms.txt 和 llms-full.txt...');

      const cwd = api.cwd;
      // 从 api.paths 获取输出目录
      const outputPath = api.paths.absOutputPath || path.join(cwd, 'dist');

      // 确保输出目录存在
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      // 构建 repomix 配置
      const llmsOutputPath = path.join(outputPath, 'llms.txt');
      const llmsFullOutputPath = path.join(outputPath, 'llms-full.txt');

      // 用户配置 + 默认配置
      const userRepomixConfig: RepomixConfig = (typeof userConfig === 'object' ? userConfig : {}) || {};
      
      // 默认配置
      const defaultConfig: RepomixConfig = {
        output: {
          style: 'markdown', // 默认使用 markdown 格式
        },
      };

      // 生成 llms.txt (无文件内容，仅文件列表)
      const llmsCliConfig = {
        output: {
          filePath: llmsOutputPath,
          files: false, // 不包含文件内容
        },
      };

      const llmsConfig = mergeConfigs(
        cwd,
        { ...defaultConfig, ...userRepomixConfig },
        llmsCliConfig
      );

      api.logger.info(`[repomix] 生成 llms.txt...`);

      // 生成 llms.txt
      const result1 = await pack([cwd], llmsConfig);

      api.logger.info(
        `[repomix] llms.txt 生成完成: ${result1.totalFiles} 个文件, ${result1.totalCharacters} 个字符, ${result1.totalTokens} tokens`
      );

      // 生成 llms-full.txt (使用默认参数，包含完整文件内容)
      const llmsFullCliConfig = {
        output: {
          filePath: llmsFullOutputPath,
        },
      };

      const llmsFullConfig = mergeConfigs(
        cwd,
        { ...defaultConfig, ...userRepomixConfig },
        llmsFullCliConfig
      );

      api.logger.info(`[repomix] 生成 llms-full.txt...`);

      const result2 = await pack([cwd], llmsFullConfig);

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

  // 在构建完成后执行
  api.onBuildComplete(({ err }) => {
    if (!err) {
      generateRepomixFiles();
    }
  });
};
