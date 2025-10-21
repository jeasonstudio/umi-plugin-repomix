import type { IApi } from 'umi';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

const execAsync = promisify(exec);

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
   * repomix 配置文件路径
   */
  configPath?: string;
  /**
   * repomix 额外参数
   */
  repomixArgs?: string[];
  /**
   * 输出目录
   * @default 'dist'
   */
  outputDir?: string;
}

export default (api: IApi) => {
  api.describe({
    key: 'repomix',
    config: {
      schema({ zod }) {
        return zod.object({
          enabled: zod.boolean().optional(),
          generateOn: zod.enum(['buildStart', 'buildEnd']).optional(),
          configPath: zod.string().optional(),
          repomixArgs: zod.array(zod.string()).optional(),
          outputDir: zod.string().optional(),
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

      // 构建 repomix 命令
      let command = 'npx repomix';

      // 添加配置文件参数
      if (config.configPath) {
        command += ` --config ${config.configPath}`;
      }

      // 添加输出参数 - 生成到输出目录
      command += ` --output ${path.join(outputPath, 'llms.txt')}`;

      // 添加额外的参数
      if (config.repomixArgs && config.repomixArgs.length > 0) {
        command += ` ${config.repomixArgs.join(' ')}`;
      }

      api.logger.info(`[repomix] 执行命令: ${command}`);

      // 执行命令生成 llms.txt
      const { stdout: stdout1, stderr: stderr1 } = await execAsync(command, {
        cwd,
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      });

      if (stderr1 && !stderr1.includes('warn')) {
        api.logger.error(`[repomix] stderr: ${stderr1}`);
      }
      if (stdout1) {
        api.logger.info(`[repomix] ${stdout1.trim()}`);
      }

      // 生成 llms-full.txt (包含更详细的信息)
      const fullCommand = command.replace(
        'llms.txt',
        'llms-full.txt'
      ) + ' --verbose';

      api.logger.info(`[repomix] 生成详细版本...`);

      const { stdout: stdout2, stderr: stderr2 } = await execAsync(fullCommand, {
        cwd,
        maxBuffer: 10 * 1024 * 1024,
      });

      if (stderr2 && !stderr2.includes('warn')) {
        api.logger.error(`[repomix] stderr: ${stderr2}`);
      }
      if (stdout2) {
        api.logger.info(`[repomix] ${stdout2.trim()}`);
      }

      api.logger.info('[repomix] ✅ 成功生成 llms.txt 和 llms-full.txt');
    } catch (error) {
      api.logger.error('[repomix] ❌ 生成文件失败:');
      if (error instanceof Error) {
        api.logger.error(error.message);
        if ('stderr' in error) {
          api.logger.error((error as any).stderr);
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
