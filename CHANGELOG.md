# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-21

### Added
- Initial release of umi-plugin-repomix
- Automatic generation of `llms.txt` and `llms-full.txt` files
- Uses Repomix SDK for file generation (not CLI)
- All repomix configuration through UmiJS config
- Configurable build timing (buildStart or buildEnd)
- Customizable output directory
- Full support for repomix configuration options
- Comprehensive documentation and examples

### Changed
- **BREAKING**: Uses Repomix SDK instead of CLI subprocess
- **BREAKING**: Removed `configPath` option - all configuration is now in UmiJS config
- **BREAKING**: Removed `repomixArgs` option - use `config` option instead

### Security
- No shell command execution - uses Repomix SDK directly
- No command injection vulnerabilities
- Safe file path handling
