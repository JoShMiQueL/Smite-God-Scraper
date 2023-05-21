# Smite God Scraper Project

This project is a web scraping application that extracts information about the gods from the Smite Fandom website and saves the data to a JSON file.

## Description

The application consists of several files that handle different tasks:

- `index.ts`: The entry point of the program that executes the main logic. It fetches all the gods' data from the Smite Fandom website, saves it to a file, and handles errors.
- `godService.ts`: Contains functions for retrieving god links and details from the Smite Fandom website.
- `utils.ts`: Provides utility functions for making HTTP requests, parsing HTML, and normalizing text.

## Usage

To run the application, follow these steps:

1. Make sure you have Node.js installed on your system.
2. Clone this repository to your local machine.
3. Open a terminal and navigate to the project's root folder.
4. Run the command `npm install` to install the dependencies.
5. Then, run `npm start` to start the application.

The god data will be extracted from the Smite Fandom website and saved to a file named `gods.json` in the root directory of the project.

## Contribution

Contributions are welcome! If you want to improve this project, follow these steps:

1. Fork this repository.
2. Create a branch with a clear description of the new feature or improvement you'll be working on.
3. Make the changes in your branch.
4. Submit a pull request describing your changes.

## Notes

- This project relies on web scraping and extracts information from the Smite Fandom website. Any changes to the website's structure may affect the application's functionality.
- This project is provided as an educational example and is not intended for commercial purposes.

## Contact

If you have any questions or suggestions related to this project, you can contact me through my GitHub profile.

Thank you for your interest in the project!