# umi-plugin-repomix

[![npm version](https://img.shields.io/npm/v/umi-plugin-repomix.svg)](https://www.npmjs.com/package/umi-plugin-repomix)
[![npm downloads](https://img.shields.io/npm/dm/umi-plugin-repomix.svg)](https://www.npmjs.com/package/umi-plugin-repomix)

UmiJS 插件，用于自动生成 `llms.txt` 和 `llms-full.txt` 文件，方便 AI 辅助工具更好地理解项目代码结构。

## 功能特性

- 🚀 自动生成 `llms.txt` 和 `llms-full.txt` 文件
- 🔧 支持自定义 repomix 配置
- 📦 支持 UmiJS 项目和 Dumi 组件库
- ⚙️ 灵活的构建时机配置
- 🎯 零配置即可使用

## 安装

```bash
npm install umi-plugin-repomix --save-dev
# or
yarn add umi-plugin-repomix -D
# or
pnpm add umi-plugin-repomix -D
```

## 使用

### 基础使用

在 `.umirc.ts` 或 `config/config.ts` 中启用插件：

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
};
```

插件会在构建完成后自动生成 `llms.txt` 和 `llms-full.txt` 文件到 `dist` 目录。

### 配置选项

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
  repomix: {
    // 是否启用插件，默认为 true
    enabled: true,
    
    // 何时生成文件，可选值：'buildStart' | 'buildEnd'，默认为 'buildEnd'
    generateOn: 'buildEnd',
    
    // 输出目录，默认为 'dist'
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
        customPatterns: ['**/*.test.ts', '**/*.spec.ts'],
      },
    },
  },
};
```

### 配置示例

#### 在构建开始时生成

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
  repomix: {
    generateOn: 'buildStart',
  },
};
```

#### 使用自定义 repomix 配置

直接在 UmiJS 配置中配置 repomix 选项：

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
  repomix: {
    config: {
      output: {
        style: 'xml',
        removeComments: false,
        showLineNumbers: true,
      },
      ignore: {
        useGitignore: true,
        useDefaultPatterns: true,
        customPatterns: ['**/*.test.ts', '**/*.spec.ts'],
      },
      security: {
        enableSecurityCheck: true,
      },
    },
  },
};
```

#### 自定义输出目录

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
  repomix: {
    outputDir: 'public',
  },
};
```

## Repomix 配置

插件使用 Repomix SDK，所有配置都通过 UmiJS 配置的 `repomix.config` 选项传递。关于 repomix 的详细配置，请参考 [Repomix 官方文档](https://repomix.com/zh-cn/guide/configuration)。

常用配置选项：

- `output.style`: 输出格式（`plain`、`xml`、`markdown`、`json`）
- `output.removeComments`: 是否移除注释
- `output.showLineNumbers`: 是否显示行号
- `output.fileSummary`: 是否包含文件摘要
- `output.directoryStructure`: 是否包含目录结构
- `ignore.useGitignore`: 是否使用 .gitignore
- `ignore.useDefaultPatterns`: 是否使用默认忽略模式
- `ignore.customPatterns`: 自定义忽略的文件模式
- `security.enableSecurityCheck`: 是否启用安全检查

## 工作原理

1. 插件在 UmiJS 构建流程中注册钩子
2. 在指定的时机（构建开始或结束）使用 Repomix SDK 的 `pack` 函数
3. 生成 `llms.txt`（标准版本）和 `llms-full.txt`（详细版本，包含文件摘要、目录结构、行号等）
4. 文件输出到指定的目录

## 常见问题

### Q: 为什么需要生成 llms.txt？

A: `llms.txt` 是一个标准格式，用于帮助 AI 工具（如 GitHub Copilot、ChatGPT 等）更好地理解项目的代码结构和内容，从而提供更准确的代码建议。

### Q: llms.txt 和 llms-full.txt 有什么区别？

A: `llms.txt` 是标准版本，包含项目的主要代码结构；`llms-full.txt` 是详细版本，包含更多的信息和注释。

### Q: 可以在开发模式下使用吗？

A: 建议在生产构建时使用此插件。如果需要在开发模式下使用，可以将 `generateOn` 设置为 `buildStart`。

## 相关链接

- [UmiJS 插件开发文档](https://umijs.org/docs/guides/plugins)
- [Repomix 官方文档](https://repomix.com/zh-cn/guide/configuration)
- [GitHub 仓库](https://github.com/jeasonstudio/umi-plugin-repomix)

## License

MIT
