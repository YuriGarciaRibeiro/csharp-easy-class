# Changelog

All notable changes to the "csharp-easy-class" extension will be documented in this file.

This project follows the recommendations of [Keep a Changelog](http://keepachangelog.com/).

## [0.0.3] - 2025-02-19

### Added
- Automatic namespace creation based on folder structure starting from the `.csproj` file location.
- Context menu now only appears when right-clicking on a folder in the Explorer.

## [0.0.2] - 2025-02-19

### Added
- Added an extension icon.

## [0.0.1] - 2025-02-18

### Added
- Initial release of the extension.
- Added a context menu option in the Explorer to create a file from C# structures copied to the clipboard.
- The extension automatically detects classes, interfaces, structs, and enums in the clipboard.
- If no valid C# code is found in the clipboard, the menu option performs no action.

## [Unreleased]

### Planned Features
- Automatically include the namespace in newly created files.
- Add a Ctrl+V shortcut for pasting and creating the file.
- Support for additional programming languages.