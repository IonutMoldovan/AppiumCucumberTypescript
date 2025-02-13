Here’s the complete updated guide for setting up the Appium project and configuring the environment for Android emulator and SDK:

Appium Cucumber TypeScript Project Setup
This repository demonstrates setting up Appium with Cucumber in TypeScript for mobile automation testing.

Prerequisites
Before running the project, ensure you have the following installed:

Node.js (version 14 or higher)
Appium (for mobile automation)
Android Studio (for Android emulator and SDK)
TypeScript (for transpiling TypeScript files)
1. Install Node.js
You can download and install Node.js from https://nodejs.org/.

2. Set Up Android Emulator
To run mobile tests on an Android emulator, you need to set up the Android Emulator and Android SDK.

Install Android Studio
Download and Install Android Studio: Follow the installation instructions for Android Studio.

Set up Android SDK:

After installing Android Studio, open it and install the Android SDK from the SDK Manager (Tools > SDK Manager).
Make sure to install the following SDK components:
SDK Platforms: Android 10 (or any other version you want to test on)
SDK Tools: Android Emulator, Android SDK Platform-tools, Android SDK Build-tools
Create a Virtual Device:

Open AVD Manager from Android Studio (Tools > AVD Manager).
Create a new Virtual Device (emulator) with your desired specifications (e.g., Pixel 3 with Android 10).
Start the emulator.
Set up Android SDK Environment Variables
To ensure that Appium can locate the Android SDK and run the emulator, set up the following environment variables:

Open the terminal and add the SDK path to your .bash_profile or .zshrc file (depending on your shell).
Add the following lines to the appropriate file:

ANDROID_HOME: This variable points to the SDK installation directory.
ANDROID_SDK_ROOT: This is also used for the Android SDK root directory.
PATH: This appends the platform-tools and emulator paths to the system PATH for easy access to commands.
The content to add:

export ANDROID_HOME=~/Library/Android/sdk
export ANDROID_SDK_ROOT=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
Reload the terminal configuration:
For bash, run:

source ~/.bash_profile
For zsh (default shell on macOS 10.15+), run:

source ~/.zshrc
This ensures that Appium can access the SDK and emulator correctly.

3. Install Dependencies
In your terminal, navigate to the project folder and run the following command to install the necessary dependencies:

npm install
4. Run the Tests
To run the Cucumber tests, use the following command:

npm run test
This will execute the Cucumber tests using cucumber-js and generate a cucumber_report.json file inside the reports folder.

5. Generate HTML Report
To generate an HTML report from the Cucumber JSON report, run the following command:

npm run generate-report
This will create an HTML report in the reports folder, specifically the cucumber_report.html.

6. Project Structure
Here’s a brief overview of the project structure:

├── features/               # Feature files containing Cucumber scenarios
├── src/                    # Source files for step definitions
│   ├── steps/              # Step definition files
│   └── ...
├── reports/                # Folder for storing generated reports
│   ├── cucumber_report.json # Cucumber JSON report
│   └── cucumber_report.html # Cucumber HTML report (generated)
├── package.json            # Project configuration file
├── tsconfig.json           # TypeScript configuration
└── ...

7. Troubleshooting
If you encounter the error cucumber-html-reporter: command not found, it might be due to the tool not being installed globally or locally in the project. To resolve this:

Ensure it's installed by running:

npm install --save-dev cucumber-html-reporter
If you installed globally and it's still not found, make sure the global npm bin directory is included in your system’s PATH.

Additional Notes
Android Emulator: The emulator must be running before executing the tests. Make sure you have started your Android Virtual Device (AVD) from Android Studio's AVD Manager.
By following these steps, you should be able to run your tests, generate reports, and configure the Android emulator for mobile testing using Appium and Cucumber with TypeScript.