# Example Usage

This directory contains an example configuration for using `umi-plugin-repomix` in your UmiJS project.

## Files

- `.umirc.ts` - Example UmiJS configuration with the repomix plugin enabled
- `repomix.config.json` - Example repomix configuration file (for reference, not used by plugin)

## Usage

1. Install the plugin in your UmiJS project:

```bash
npm install umi-plugin-repomix --save-dev
```

2. Copy the configuration from `.umirc.ts` to your project's configuration file (optional, plugin works with default settings)

3. Customize the repomix options in your UmiJS configuration to fit your project's needs

4. Run your UmiJS build:

```bash
npm run build
```

5. After the build completes, you'll find `llms.txt` and `llms-full.txt` in your `dist` directory

## Configuration Options

All repomix configuration is done through the UmiJS config file. The plugin uses Repomix SDK internally.

See the main README.md for detailed configuration options.
