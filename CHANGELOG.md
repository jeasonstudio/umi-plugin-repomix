# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-21

### Added
- Initial release of umi-plugin-repomix
- Automatic generation of `llms.txt` and `llms-full.txt` files
- Uses Repomix SDK for file generation (not CLI)
- Direct Repomix configuration through UmiJS config
- Support for `repomix: false` to disable plugin
- Automatic detection of output directory from UmiJS
- Default markdown output format
- `llms.txt`: Lightweight version with file list only (files: false)
- `llms-full.txt`: Full version with complete file contents
- Comprehensive documentation and examples

### Design Decisions
- Plugin enabled by default when installed (UmiJS convention)
- Runs only on `buildEnd` for production builds
- No `enabled`, `generateOn`, or `outputDir` config fields needed
- Config is directly RepomixConfig, no wrapper object
- Default `style: 'markdown'` instead of XML

### Security
- No shell command execution - uses Repomix SDK directly
- No command injection vulnerabilities
- Safe file path handling
