import { defineConfig } from 'umi';

export default defineConfig({
  // 启用 repomix 插件
  plugins: ['umi-plugin-repomix'],
  
  // 配置 repomix 选项（可选，安装后默认启用）
  repomix: {
    // 所有配置都是标准的 Repomix 配置
    output: {
      style: 'markdown', // 输出格式，默认为 markdown
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
  
  // 其他 UmiJS 配置
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
