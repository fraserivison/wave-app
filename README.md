# Wave

## Table of Contents
1. [Overview](#overview)
2. [User Experience (UX)](#user-experience-ux)
    - [Strategy](#strategy)
    - [Scope](#scope)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
    - [Surface](#surface)
    - [Colour Palette](#colour-palette)
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

Key features include user profiles, project sharing, real-time collaboration tools, and communication capabilities for discussion and feedback. The application is built using React for the frontend, ensuring a responsive and interactive experience, while the backend is powered by Django, providing a robust and secure environment for managing user data and interactions.

---

## User Experience (UX)

### Strategy
The primary strategy for the Wave app is to create an engaging platform for DJs and music producers to collaborate on music projects. This involves understanding the needs of the target audience and ensuring that the features offered facilitate seamless communication and project management.

### Scope
Wave will have the following functionalities:
- User registration and profile management
- Music sharing capabilities
- Collaboration tools, including real-time feedback and communication
- Integrated system to follow other users

### Structure
The app will be structured into key components:
- **Navbar**: For navigation between pages
- **Main Content Area**: To display project details, user profiles, and collaboration tools

### Skeleton
A wireframe of the application is designed to visualise the layout of each component, highlighting how users will navigate between different sections and access features.

### Surface
The design will employ a modern aesthetic with a clean layout, using a dark-themed colour palette to resonate with the electronic music culture. Bootstrap will be utilised to ensure a responsive design across devices.

### Colour Palette
The primary colour scheme for Wave includes:
- **#f8f9fa**: A light grey tone used for the background.
- **#ffffff**: White for text and accents.
- **#9933ff**: A vibrant purple used for highlights and buttons.
- **#00ffcc**: Neon blue used for interactive elements and accents.

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

- **Profile Creation and Editing**: Users can create and edit their profiles to showcase their work and music.
- **Music Sharing**: Users can upload and share their music, which is automatically posted to the discovery page.
- **Discovery Page**: A page where users can discover and listen to tracks shared by other users.
- **Follow Users**: Users can follow other DJs and producers to stay updated on their new uploads and projects.
- **Track Rating**: Users can rate tracks shared by others, providing feedback for improvement.

### Features Removed

- **Comments Model**: We had intended to implement a commenting system for tracks but didn’t get around to completing this feature in the initial project phase.
- **Follow Model**: A model to manage user follow functionality is also in the backlog for future implementation.

### Features To Be Implemented

- **Comments**: Will be implemented to allow users to leave feedback on tracks.
- **Follow**: The follow functionality will be added to allow users to track and engage with other profiles.

---

## Project Iteration Focus

- Focus on **user profile creation** and **music sharing functionality**.
- Finalise the **real-time features**.
- Implement the **search functionality** for users and tracks.

### Description of Entities

- **User**: Represents a user of the platform, with fields for username, email, genre, and bio.
- **Profile**: Represents a user's profile with fields for name, bio, image, and timestamps for creation and last update.
- **Track**: Represents a music track uploaded by the user, with fields for title, genre, and file URL.
- **Project**: Represents a collaborative music project, which can involve multiple users.
- **Rating**: Represents feedback given by users on tracks, including a score and comment.

## Testing

### Automated Testing
Automated tests were set up for basic functionality such as profile creation, music sharing, and track rating. These tests ensure the app's main features continue to work after updates and bug fixes.

### Manual Testing
- **Profile Creation**: Test that users can create a profile and add their music correctly.
- **Track Sharing**: Ensure that uploaded tracks appear on the discovery page and are playable.
- **Follow Users**: Test that users can follow other users and receive notifications for new uploads.
- **Bug Fixes**: Address any issues found during testing.

### Bug Fixes
- **Bug with Track Display**: An issue with the track display not updating correctly after upload was resolved by fixing the front-end data rendering logic.
- **Follow System**: The follow feature was partially implemented but required refinement and further integration with user notifications.

## Deployment

Deployment instructions for hosting the app are available in the `deployment` section, detailing how to push the code to the production server.

---

### Project Setup

### Backend Setup:
- Set up Django with the `profiles` app to handle user profiles.
- Implemented the `Profile` model with user-specific information, including a profile image.
- Used Django Rest Framework (DRF) to expose profile details and the ability to update them.
- Set up signals to automatically create a profile when a new user is registered.

---

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
  - **React**: JavaScript library for building user interfaces.
  - **Django**: Python framework for backend development.
  - **PostgreSQL**: Database management system.
  - **Bootstrap**: Frontend framework for responsive design.
  - **Cloudinary**: Cloud storage for images and media files.

- **Icons and Fonts**:  
  - [FontAwesome](https://fontawesome.com)
  - [Google Fonts](https://fonts.google.com)

- **Open Source Resources**:  
  - [Django Documentation](https://docs.djangoproject.com)
  - [Bootstrap Documentation](https://getbootstrap.com/docs)
  - [React Documentation](https://reactjs.org/docs/getting-started.html)
  - [FontAwesome Documentation](https://fontawesome.com/how-to-use/on-the-web/using-with/react)

- **Acknowledgements**:  
  Special thanks to all open-source contributors for their libraries and tools that helped make this project possible.

---

[Back to TOP](#table-of-contents)


