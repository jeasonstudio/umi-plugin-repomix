import { defineConfig } from 'umi';

export default defineConfig({
  // 启用 repomix 插件
  plugins: ['umi-plugin-repomix'],
  
  // 配置 repomix 选项
  repomix: {
    // 是否启用插件
    enabled: true,
    
    // 何时生成文件：'buildStart' 或 'buildEnd'
    generateOn: 'buildEnd',
    
    // 输出目录
    outputDir: 'dist',
    
    // Repomix 配置选项
    config: {
      output: {
        style: 'markdown',
        removeComments: false,
        showLineNumbers: true,
      },
      ignore: {
        useGitignore: true,
        useDefaultPatterns: true,
        customPatterns: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/.umi/**',
          '**/.umi-production/**',
        ],
      },
      security: {
        enableSecurityCheck: true,
      },
    },
  },
  
  // 其他 UmiJS 配置
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
