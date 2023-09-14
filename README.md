# Web Summarizer Chrome Extension

The Web Summarizer Chrome Extension allows users to quickly generate summaries of web pages they are browsing. The extension provides options to customize the type and length of the summary.

## Table of Contents

-   [Code Formatting](#code-formatting)
-   [Features](#features)
-   [Installation](#installation)
-   [How to Use](#how-to-use)
-   [Notes](#notes)
-   [License](#license)
-   [Acknowledgments](#acknowledgements)

## Code Formatting

The code in this project has been formatted using prettier, a popular code formatter. Prettier enforces a consistent code style throughout the project. To format the code in this project:

1. Install Prettier through VSC extension library.
2. Configure it as the default formatter for the project.

This ensures that the code maintains a uniform style for improved readability and maintainability.

## Features

-   Generate summaries of web pages.
-   Choose between a paragraph-style summary or bullet points.
-   Choose between NLP and AI to generate summary.
-   Customize the length of the summary.
-   Copy the generated summary to the clipboard.

## Installation

1. Clone this repository to your local machine.
2. Open Google Chrome.
3. Go to `chrome://extensions/`.
4. Enable "Developer mode" using the toggle switch.
5. Click on "Load unpacked" and select the cloned repository folder.

## How to Use

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. The settings box allows you to customize the type and length of the summary.
3. Click the "Summarize this site" or "Summarize using AI" button to generate a summary of the current web page.
4. The generated summary will be displayed in the output textarea.
5. Click the "Copy" button to copy the summary to your clipboard.

## Notes

-   The extension uses an API to generate summaries. Ensure that the API server is running and accessible.
-   The API for this is written in Python using Flask library.
-   The extension is configured to work with a specific API URL. Update `api_url` in the JavaScript code to match your API server.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

This extension is built using HTML, CSS, JavaScript, and the Chrome Extension API.
