## Project Overview

This project is a Progressive Web App (PWA) built with React. It provides offline capabilities and can be installed locally on your device. The goal of this project is to learn and apply PWA patterns to make a web app feel more like a native app using only web tools.

## What is a Progressive Web App (PWA)?

A Progressive Web App (PWA) is a type of application software delivered through the web, built using common web technologies including HTML, CSS, and JavaScript. PWAs are intended to work on any platform that uses a standards-compliant browser, including both desktop and mobile devices.

### Key Features of PWAs:
- **Offline Capabilities**: PWAs can work offline or on low-quality networks.
- **Installable**: PWAs can be installed on the user's device, providing a more native app-like experience.
- **Responsive**: PWAs are responsive and work on different screen sizes and orientations.
- **Secure**: PWAs are served over HTTPS to ensure secure connections.

## Learning Objectives

By working on this project, you will learn:
- How to build a PWA using React.
- How to implement offline capabilities using service workers.
- How to make a web app installable on a user's device.
- How to use web tools to create a native app-like experience.

## Project Structure

- **src/**: Contains the source code of the React application.
- **public/**: Contains the public assets and the `public/webmanifest.json` file for the PWA.
- **public/sw.js**: The service worker file that handles caching and offline capabilities.


To get started with this project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/GajendrasinghDawar/Note-Keeper.git
    cd Note-Keeper
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the development server**:
    ```sh
    npm start
    ```

4. **Build the project for production**:
    ```sh
    npm run build
    ```

## Resources

Here are some resources to help you learn more about PWAs and React:

- [Progressive Web Apps - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Service Workers - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
