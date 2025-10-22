# Contributing to umi-plugin-repomix

Thank you for your interest in contributing to umi-plugin-repomix!

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/jeasonstudio/umi-plugin-repomix.git
cd umi-plugin-repomix
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

## Development Workflow

### Building

The plugin is written in TypeScript and needs to be compiled to JavaScript:

```bash
npm run build
```

For continuous development, you can use watch mode:

```bash
npm run dev
```

### Project Structure

```
umi-plugin-repomix/
├── src/              # TypeScript source files
│   └── index.ts      # Main plugin entry point
├── dist/             # Compiled JavaScript files (generated)
├── example/          # Example usage
├── package.json      # Package configuration
├── tsconfig.json     # TypeScript configuration
└── README.md         # Documentation
```

## Plugin Architecture

This plugin follows the UmiJS plugin development guidelines:

1. **Plugin Registration**: The plugin exports a default function that receives the UmiJS API
2. **Configuration Schema**: Uses Zod schema for type-safe configuration
3. **Build Hooks**: Registers hooks for `onStart` or `onBuildComplete` based on configuration
4. **Command Execution**: Uses `execFile` for safe command execution

## Security

When contributing, please ensure:

- Never use string concatenation for shell commands
- Always use `execFile` with array arguments instead of `exec`
- Sanitize all user inputs
- Use `path.resolve` for path handling
- Run security checks before submitting

## Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Add JSDoc comments for public APIs
- Keep functions focused and small

## Testing

Before submitting a pull request:

1. Build the plugin successfully
2. Test the plugin in a real UmiJS project
3. Verify that `llms.txt` and `llms-full.txt` are generated correctly
4. Check for any security vulnerabilities

## Submitting Changes

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes
4. Test thoroughly
5. Submit a pull request with a clear description

## Questions?

If you have any questions, please open an issue on GitHub.
