# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Wave

## Table of Contents
1. [Overview](#overview)
2. [User Experience (UX)](#user-experience-ux)
    - [Strategy](#strategy)
    - [Scope](#scope)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
    - [Surface](#surface)
    - [User Experience Enhancements](#user-experience-enhancements)
3. [Agile Development](#agile-development)
    - [Epics](#epics)
    - [User Stories](#user-stories)
    - [Tasks](#tasks)
    - [Acceptance Criteria](#acceptance-criteria)
4. [Features](#features)
5. [Project Iteration Focus](#project-iteration-focus)
6. [Database Schema](#database-schema)
7. [Testing](#testing)
    - [Automated Testing](#automated-testing)
    - [Manual Testing](#manual-testing)
    - [Bug Fixes](#bug-fixes)
8. [Deployment](#deployment)
9. [Project Setup](#project-setup)
10. [Version Control](#version-control)
11. [Credits](#credits)

---

## Overview

**Wave** is a collaborative platform designed for DJs and music producers, enabling them to connect, share ideas, and work together on music projects. The app facilitates a creative environment where users can showcase their talents, collaborate on tracks, and receive feedback from peers. With a user-friendly interface and essential features tailored for the electronic music genre, Wave aims to enhance the collaborative process, making it easier for artists to network and create together.

Key features include user profiles, project sharing, real-time collaboration tools, and communiction capabilities for discussion and feedback. The application is built using React for the frontend, ensuring a responsive and interactive experience, while the backend is powered by Django, providing a robust and secure environment for managing user data and interactions.

---

## User Experience (UX)

### Strategy
The primary strategy for the Wave app is to create an engaging platform for DJs and music producers to collaborate on music projects. This involves understanding the needs of the target audience and ensuring that the features offered facilitate seamless communication and project management.

### Scope
Wave will have the following functionalities:
- User registration and profile management
- Project creation and sharing capabilities
- Collaboration tools, including real-time feedback and communication
- Integrated messaging system for direct communication between users

### Structure
The app will be structured into key components:
- **Navbar**: For navigation between pages
- **Sidebar**: For quick access to user projects and profiles
- **Main Content Area**: To display project details, user profiles, and collaboration tools

### Skeleton
A wireframe of the application is designed to visualise the layout of each component, highlighting how users will navigate between different sections and access features.

### Surface
The design will employ a modern aesthetic with a clean layout, using a dark-themed colour palette to resonate with the electronic music culture. Bootstrap will be utilised to ensure a responsive design across devices.

### User Experience Enhancements
To enhance user experience, the app will include:
- Intuitive navigation and user interface design
- Real-time updates and notifications for collaboration
- User-friendly forms for project submission and feedback

---

## Agile Development

### Epics
The development process is divided into several epics, focusing on major functionalities such as user authentication, project management, and community engagement.

### User Stories
- As a user, I want to create a profile so that I can showcase my skills and projects.
- As a DJ, I want to collaborate with other producers in real-time to create music together.
- As a member of the community, I want to provide and receive feedback on projects to improve my skills.

### Tasks
Each user story will be broken down into manageable tasks, such as designing the user profile interface, implementing project sharing functionalities, and developing the community forum.

### Acceptance Criteria
For each feature, specific acceptance criteria will be established to ensure that the functionality meets the user’s needs and expectations before being marked as complete.

---

## Features

Users can upload their tracks which will then automaticaly get posted to the discovery page.

### Features Removed

Removed the settings feature in the Sidebar as it would be too much work right now- go in to detail.

### Features To Be Implemented

---

## Project Iteration Focus

## Database Schema

<img src="assets/images/erd.png" alt="ERD Diagram" width="350px">
<p>Entity Relationship Diagram (ERD).</p>

### Description of Entities

## Testing

### Automated Testing

### Manual Testing

### Bug Fixes


## Deployment

---

### Project Setup


## Version Control


Key files:
- `Procfile`
- `requirements.txt`
- `.gitignore`
- `env.py`

---

## Credits

- **Libraries and Frameworks**:  
  The following libraries and frameworks were utilised to build this project:
  - **React**:
  - **Django**:
  - **PostgreSQL**:
  - **Bootstrap**:
  - **Cloudinary**: 

- **Icons and Fonts**:  
  - [FontAwesome](https://fontawesome.com)
  - [Google Fonts](https://fonts.google.com)

- **Documentation and Resources**:  
  - [Django Documentation](https://docs.djangoproject.com)
  - [Bootstrap Documentation](https://getbootstrap.com/docs)

- **Acknowledgements**:  

## End.

[Back to TOP](#table-of-contents)


### Colours
#343a40
#ffffff
#9933ff
#00ffcc 