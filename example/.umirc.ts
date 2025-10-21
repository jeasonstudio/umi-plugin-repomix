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
    
    // repomix 配置文件路径（可选）
    configPath: './repomix.config.json',
    
    // 输出目录
    outputDir: 'dist',
    
    // 额外的 repomix 参数（可选）
    // repomixArgs: ['--style', 'xml'],
  },
  
  // 其他 UmiJS 配置
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
