# C# Easy Class Extension for VS Code

A simple Visual Studio Code extension that allows you to create a C# class file directly from the clipboard content.

## Features

- **Create C# Class from Clipboard**: 
  - If a valid C# class, interface, struct, or enum is copied to the clipboard, this extension provides an option to create a new `.cs` file with the class name.
  - If the clipboard content is not a valid C# class, a message is shown and no action is performed.

- **Always Visible Context Menu Item**: 
  - The context menu will always have the option, but if the clipboard content is not a C# class, there will be a warning

## How to Use

1. **Install the Extension**:
   - Search for `C# Easy Class` in the VS Code marketplace and install it.

2. **Using the Context Menu**:
   - Copy a valid C# class, interface, struct, or enum to the clipboard.
   - Right-click on a folder or file in the explorer sidebar and select the option **"Paste Class from Clipboard"**.

3. **If the Clipboard Contains Invalid Content**:
   - If the clipboard content is not a valid C# class, the context menu option will display a message saying, "The clipboard content is not a valid C# class," and no file will be created.

## Requirements

- Visual Studio Code version 1.50.0 or higher.
- The extension works with any valid C# code (class, interface, struct, enum) copied to the clipboard.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.