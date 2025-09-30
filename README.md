# 🚫 ACB - Web Content Blocker Extension

A lightweight Chrome extension that automatically blocks inappropriate content by detecting banned keywords in URLs, titles, and page content. Features a whitelist system to protect legitimate sites from false positives.

## ✨ Features

- **Smart Content Detection**: Scans URLs, page titles, and content for inappropriate keywords
- **Instant Tab Closure**: Automatically closes tabs containing banned content
- **Whitelist Protection**: Never blocks trusted sites like GitHub, YouTube, or Google
- **Customizable Filters**: Add or remove banned words through the popup interface
- **Domain Whitelisting**: Add your trusted domains to prevent false positives
- **Lightweight Performance**: Only scans first 5000 characters to maintain browser speed
- **Privacy-Focused**: All processing happens locally, no data sent to external servers

## 🚀 Installation

1. Clone this repository:
  git clone https://github.com/yourusername/safebrowse-extension.git
2. Open Chrome and navigate to chrome://extensions/
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon will appear in your toolbar

## 📁 Project Structure
ACBExtension/

├── manifest.json       # Extension configuration

├── background.js       # Background script for content checking

├── content.js         # Content script for page scanning

├── popup.html         # Settings interface

├── popup.js          # Settings functionality

## 🎯 How It Works

1. Content Scanning: When a page loads, the content script extracts text from the page
2. Keyword Matching: The background script checks against the banned words list
3. Whitelist Check: Trusted domains bypass all content checks
4. Action: If banned content is found, the tab is immediately closed

## ⚙️ Configuration
🎯 How It Works

1. Content Scanning: When a page loads, the content script extracts text from the page
2. Keyword Matching: The background script checks against the banned words list
3. Whitelist Check: Trusted domains bypass all content checks
4. Action: If banned content is found, the tab is immediately closed

## ⚙️ Configuration
**Adding Banned Words**

1. Click the extension icon
2. Add words (one per line) in the "Banned Words" textarea
3. Click "Save Settings"

**Adding Whitelisted Domains**

1. Click the extension icon
2. Add domains (one per line) in the "Whitelisted Domains" textarea
3. Click "Save Settings"

## 🛡️ Privacy

1. No Data Collection: This extension doesn't collect or transmit any user data
2. Local Processing: All content checking happens on your device
3. Open Source: Review the code to see exactly what it does

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.
Development Setup

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📝 To-Do

1. Add regex pattern support for more precise filtering
2. Implement time-based blocking schedules
3. Add password protection for settings
4. Create options for soft warnings instead of instant closure
5. Add import/export settings feature
6. Support for multiple filter lists

## ⚠️ Known Issues

1. Generic words may cause false positives (consider your banned words carefully)
2. Some dynamic content loaded after initial page load may not be scanned

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

1. Built for maintaining a safer browsing experience
2. Inspired by the need for better parental controls and productivity tools
3. Thanks to all contributors and users for their feedback

## 💬 Support
If you encounter any issues or have suggestions, please open an issue on GitHub.

## ⭐ If you find this extension helpful, please consider giving it a star!
