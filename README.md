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
  // 安装后默认启用，无需额外配置
};
```

### 禁用插件

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
  repomix: false, // 禁用插件
};
```

### 配置选项

所有配置选项都是标准的 Repomix 配置，直接在 `repomix` 字段中设置：

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
  repomix: {
    output: {
      style: 'markdown', // 输出格式，默认为 markdown
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
};
```

### 配置示例

#### 自定义忽略模式

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
  repomix: {
    ignore: {
      useGitignore: true,
      useDefaultPatterns: true,
      customPatterns: ['**/*.test.ts', '**/*.spec.ts', '**/.umi/**'],
    },
  },
};
```

#### 自定义输出格式

```typescript
export default {
  plugins: ['umi-plugin-repomix'],
  repomix: {
    output: {
      style: 'xml', // 可选: 'plain', 'xml', 'markdown', 'json'
      removeComments: true,
      showLineNumbers: false,
    },
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

1. 插件在 UmiJS 构建流程中注册 `onBuildComplete` 钩子
2. 在构建完成后使用 Repomix SDK 的 `pack` 函数
3. 生成两个文件：
   - `llms.txt`：轻量版本，仅包含文件列表（`files: false`）
   - `llms-full.txt`：完整版本，包含所有文件内容和默认配置
4. 文件输出到 UmiJS 配置的输出目录（通常是 `dist`）
5. 默认使用 `markdown` 格式输出

## 常见问题

### Q: 为什么需要生成 llms.txt？

A: `llms.txt` 是一个标准格式，用于帮助 AI 工具（如 GitHub Copilot、ChatGPT 等）更好地理解项目的代码结构和内容，从而提供更准确的代码建议。

### Q: llms.txt 和 llms-full.txt 有什么区别？

A: `llms.txt` 是轻量版本，仅包含文件列表和基本信息，不包含文件内容；`llms-full.txt` 是完整版本，包含所有文件的完整内容。

### Q: 可以在开发模式下使用吗？

A: 插件在 `onBuildComplete` 钩子中执行，主要用于生产构建。开发模式下不会自动生成文件。

## 相关链接

- [UmiJS 插件开发文档](https://umijs.org/docs/guides/plugins)
- [Repomix 官方文档](https://repomix.com/zh-cn/guide/configuration)
- [GitHub 仓库](https://github.com/jeasonstudio/umi-plugin-repomix)

## License

MIT
