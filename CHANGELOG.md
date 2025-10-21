# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-21

### Added
- Initial release of umi-plugin-repomix
- Automatic generation of `llms.txt` and `llms-full.txt` files
- Support for custom repomix configuration
- Configurable build timing (buildStart or buildEnd)
- Customizable output directory
- Support for additional repomix command-line arguments
- Comprehensive documentation and examples

### Security
- Fixed shell command injection vulnerabilities by using `execFile` instead of `exec`
- Proper path sanitization using `path.resolve`
- Safe argument passing using array-based command execution
