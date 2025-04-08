# Instagram Username Checker

## What is this?

This is a Node.js script that allows you to check if an Instagram username is available and attempt to claim it using a provided Instagram account. It uses third-party libraries (`instagram-private-api` and others) to interact with Instagram's API and supports optional proxy usage for availability checks.

---

## Getting Started

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/en/download/) installed on your system.
- Familiarize yourself with basic command-line usage (e.g., running `npm` commands).

### Installation
1. Clone this repository or download the project files.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install all required dependencies listed in `package.json`.

---

## Usage

1. Run the script by executing `node main.js` in your terminal.
2. Follow the prompts:
   - Enter your Instagram account username (the account you want to use to claim the username).
   - Enter your Instagram account password.
   - Enter the target username you want to check and claim.
   - Choose whether to use proxies (y/n).
3. If you choose to use proxies:
   - Create a file named `proxies.txt` in the project directory.
   - Each line of `proxies.txt` should contain a proxy address in the format `[invalid url, do not cite]
   - Example:
