# Wave Frontend

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
- Music playing, rating and sharing capabilities
- Event sharing capabilities

### Structure
The app will be structured into key components:
- **Navbar**: For navigation between pages
- **Main Content Area**: To display project details, user profiles, tracks and events.

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

Automated tests were set up to ensure that key features of the app function correctly after updates and bug fixes. The tests covered important functionality such as the navbar, creating a track, and creating an event. These tests help guarantee that critical user interactions continue to work smoothly and without issues.

#### Navbar Functionality

Automated tests for the navbar functionality focused on verifying that the navigation menu is responsive and that users can successfully navigate between different pages. Specifically, the tests checked:

- That the correct links are present in the navbar, such as "Home," "Create Track," "Create Event," and "Profile."
- That users can click on navbar links and are directed to the appropriate pages.
- That the "Sign out" button works as expected and logs users out of the app.

These tests were passing earlier in production, confirming that users could reliably navigate through the app without encountering any issues with the navbar.

#### Creating a Track

Automated tests were also set up to ensure that users can successfully create a track, including uploading both an audio file and an album cover. These tests verified:

- That the track creation form appears and can be filled out correctly.
- That users can select a genre, enter a track title, and upload an audio file and album cover.
- That the form submits correctly, creating a new track in the database.
- That errors are displayed for invalid input, such as missing required fields.

These tests were previously passing in production, confirming that users could easily create and upload tracks to the app.

#### Creating an Event

Creating an event was another important feature covered by automated tests. These tests ensured that users could:

- Successfully access the event creation form and fill in all necessary details, including event name, date, time, location, and genre.
- Submit the form, creating a new event in the database.
- Receive error messages if any required fields were left blank or filled incorrectly.

These automated tests passed in production earlier, ensuring that users could smoothly create and share events within the app.

### Manual Testing

Manual tests were conducted to validate critical user flows and ensure the application behaves as expected in various scenarios. These tests focused on verifying that users can create and manage their profiles, tracks, events, and interactions with other users. Below are the key aspects tested manually:

#### **Profile Creation**
- **Tested**: Ensured that users can create a profile, entering required details like DJ name, bio, and image.
- **Validation**: Verified that the profile displays correctly after creation, with users able to update their bio, upload a new profile image, and make changes to their DJ name.

#### **Track Sharing**
- **Tested**: Confirmed that users can upload tracks and that the tracks appear on the discovery page.
- **Validation**: Ensured that uploaded tracks are playable through the app and that users can view details like the track title, genre, and album cover.

#### **Track Rating**
- **Tested**: Verified that users can rate tracks on a scale of 1-5 stars.
- **Validation**: Checked that the rating is updated and reflected immediately on the track page. Also, validated that the track's average rating is calculated correctly and displayed for all users to see.
- **Permissions**: Ensured that users cannot rate their own tracks.

#### **Track Removal and Updating**
- **Tested**: Checked that the owner of a track (the user who uploaded it) can update track details, including the title, genre, album cover, and audio file.
- **Validation**: Ensured that only the owner of the track can update or remove it, preventing unauthorized users from making changes.
- **Removal**: Verified that users can delete their own tracks, and that deleted tracks no longer appear in the discovery page or user profiles.

#### **Event Creation**
- **Tested**: Confirmed that users can create events by providing details like event name, date, time, location, and genre.
- **Validation**: Ensured that the event appears correctly on the user's profile page and on the event discovery page.
- **Permissions**: Checked that users are only able to create events with their own profiles. Event creators should have full control over their events.

#### **Event Editing and Deleting**
- **Tested**: Ensured that event creators can update event details, such as changing the event date, location, or genre.
- **Validation**: Confirmed that only the event owner can edit or delete their events.
- **Permissions**: Ensured that event details are protected and cannot be modified by anyone other than the creator.

#### **Routing**
- **Tested**: Verified that all the application routes work correctly, including:
  - Navigating to the profile page, track detail page, and event detail page.
  - Ensuring the "Create Track" and "Create Event" pages load properly.
  - Verifying that the "Sign out" button logs the user out and redirects to the login page.
- **Validation**: Ensured that all routes render the correct page content based on the URL and that users cannot access pages without proper authentication or permissions.

#### **Music Playback**
- **Tested**: Checked that uploaded music files (audio tracks) are playable on the platform.
- **Validation**: Verified that users can click on a track and that it plays without issues (e.g., buffering or errors). Ensured that audio files are properly linked and accessible for streaming on the discovery page and user profiles.

#### **Follow Users**
- **Tested**: Ensured that users can follow other users by visiting their profiles and clicking the "Follow" button.
- **Validation**: Verified that users can see new uploads from followed users in their feed and are notified of new music or event posts by followed DJs.

#### **General Flow**
- **Tested**: Confirmed that the app functions smoothly across different screen sizes, browsers, and devices.
- **Validation**: Verified that the UI components (forms, buttons, track play buttons) are responsive and work as expected across mobile, tablet, and desktop devices.

### Bug Fixes

Throughout the development process, various bugs were encountered and resolved to ensure a seamless user experience. Below is a detailed account of the most significant issues and the steps taken to address them:

#### **Bug with Track Display**
- **Issue**: Uploaded tracks were not appearing on the discovery page immediately after upload, requiring users to refresh the page to see their content.
- **Cause**: The issue was traced to a front-end rendering problem where the state was not being updated correctly upon receiving a successful API response.
- **Fix**: Implemented state management improvements to ensure the discovery page re-renders whenever new tracks are uploaded. Added real-time updates by re-fetching data after uploads.

#### **Track Rating Issues**
- **Issue**: Users were unable to rate tracks consistently, and the displayed average rating did not update correctly after new ratings were submitted.
- **Cause**: A bug in the `update_average_rating` method in the `Track` model was causing incorrect calculations, as it failed to account for all rating entries.
- **Fix**: Adjusted the `update_average_rating` logic to include accurate aggregation of all ratings. Conducted additional tests to verify functionality.

#### **Permissions Errors**
- **Issue**: Unauthorized users could attempt to edit or delete tracks and events that they did not own, though the actions would fail silently on the backend.
- **Cause**: Missing permission checks on certain API endpoints allowed unauthorized requests to be processed without proper validation.
- **Fix**: Added robust permission checks to API endpoints, ensuring only content owners could perform editing or deletion actions. Updated error handling to provide informative feedback for unauthorized users.

#### **Event Creation Bug**
- **Issue**: Some users reported being unable to create events, with the form submission failing without any visible errors.
- **Cause**: A validation error in the backend was caused by incomplete date/time formatting in the submitted data.
- **Fix**: Updated the event form to enforce proper date and time input formats. Enhanced backend error messages to assist in debugging similar issues.

#### **Music Playback Issues**
- **Issue**: Certain uploaded tracks failed to play, with some users encountering "file not found" errors.
- **Cause**: This was caused by incorrect file paths being saved in the database when tracks were uploaded.
- **Fix**: Corrected the file handling logic to ensure accurate file paths were stored. Added tests to verify that all uploaded audio files could be accessed and played.

#### **Routing Errors**
- **Issue**: Some users reported being redirected to the wrong pages when navigating to specific routes like profile editing or event creation.
- **Cause**: The router configuration contained outdated paths that no longer aligned with the app's structure.
- **Fix**: Updated all routing configurations to match the latest app structure and tested navigation across different user flows.

#### **Navbar Functionality**
- **Issue**: The navbar occasionally failed to highlight the active page or update dynamically after a user signed in or out.
- **Cause**: The issue was due to improper state updates for the active page and authentication status in the front end.
- **Fix**: Refactored the navbar component to correctly listen for authentication and route changes, ensuring it dynamically updates based on user actions.

#### **Profile Image Uploads**
- **Issue**: Some users were unable to upload profile images due to size limitations or unsupported file formats.
- **Cause**: There were no proper checks in place to validate file size and format on the client side before submission.
- **Fix**: Added client-side validation to enforce file size and format restrictions. Enhanced error messages to inform users about acceptable file types and sizes.

#### **General Performance Optimisation**
- **Issue**: The app experienced slow loading times on pages with a large number of tracks or events.
- **Cause**: Inefficient database queries and unoptimized API responses were leading to performance bottlenecks.
- **Fix**: Optimised database queries by implementing pagination and limiting the number of items fetched per request. Added caching for frequently accessed data.

### Conclusion
Addressing these bugs was a critical part of the development process, ensuring the app delivers a reliable and user-friendly experience. Each issue provided valuable insights into the app’s functionality, helping to refine both the front-end and back-end systems.


## Deployment Instructions

The site was deployed to Heroku. The steps to deploy are as follows:

1. Navigate to [Heroku](https://www.heroku.com) and create an account if you don't have one.
2. Click the **New** button in the top right corner.
3. Select **Create New App**.
4. Enter a name for your app.
5. Select a region and click **Create App**.
6. Go to the **Settings** tab and click **Reveal Config Vars**.
7. Click the **Deploy** tab.
8. Scroll down to **Connect to GitHub** and sign in/authorize when prompted.
9. In the search box, find the repository you want to deploy and click **Connect**.
10. Scroll down to **Manual Deploy** and choose the **main** branch to deploy your app.

Once the deployment process is complete, the app should be live on Heroku.

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

---

[Back to TOP](#table-of-contents)



