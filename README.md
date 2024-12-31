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

Key features include user profiles, project sharing, real-time collaboration tools, and communiction capabilities for discussion and feedback. The application is built using React for the frontend, ensuring a responsive and interactive experience, while the backend is powered by Django, providing a robust and secure environment for managing user data and interactions.

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

### Features To Be Implemented

---

## Project Iteration Focus

- Focus on **user profile creation** and **music sharing functionality**.
- Finalise the **real-time features**.
- Implement the **search functionality** for users and tracks.

## Database Schema

<img src="assets/images/erd.png" alt="ERD Diagram" width="350px">
<p>Entity Relationship Diagram (ERD).</p>

### Description of Entities

- **User**: Represents a user of the platform, with fields for username, email, genre, and bio.
- **Profile**: Represents a user's profile with fields for name, bio, image, and timestamps for creation and last update.
- **Track**: Represents a music track uploaded by the user, with fields for title, genre, and file URL.
- **Project**: Represents a collaborative music project, which can involve multiple users.
- **Rating**: Represents feedback given by users on tracks, including a score and comment.


## Testing

### Automated Testing

### Manual Testing

- **Profile Creation**: Test that users can create a profile and add their music correctly.
- **Track Sharing**: Ensure that uploaded tracks appear on the discovery page and are playable.
- **Follow Users**: Test that users can follow other users and receive notifications for new uploads.

### Bug Fixes


## Deployment

---

### Project Setup

### Backend Setup:
- Set up Django with the `profiles` app to handle user profiles.
- Implemented the `Profile` model with user-specific information, including a profile image.
- Used Django Rest Framework (DRF) to expose profile details and the ability to update them.
- Set up signals to automatically create a profile when a new user is registered.


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




![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

Welcome fraserivison ,

This is the Code Institute student template for Gitpod. We have preinstalled all of the tools you need to get started. It's perfectly ok to use this template as the basis for your project submissions.

You can safely delete this README.md file or change it for your own project. Please do read it at least once, though! It contains some important information about Gitpod and the extensions we use. Some of this information has been updated since the video content was created. The last update to this file was: **June 18, 2024**

## Gitpod Reminders

To run a frontend (HTML, CSS, Javascript only) application in Gitpod, in the terminal, type:

`python3 -m http.server`

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

To run a backend Python file, type `python3 app.py` if your Python file is named `app.py`, of course.

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

By Default, Gitpod gives you superuser security privileges. Therefore, you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the lessons.

To log into the Heroku toolbelt CLI:

1. Log in to your Heroku account and go to *Account Settings* in the menu under your avatar.
2. Scroll down to the *API Key* and click *Reveal*
3. Copy the key
4. In Gitpod, from the terminal, run `heroku_config`
5. Paste in your API key when asked

You can now use the `heroku` CLI program - try running `heroku apps` to confirm it works. This API key is unique and private to you, so do not share it. If you accidentally make it public, you can create a new one with _Regenerate API Key_.

### Connecting your Mongo database

- **Connect to Mongo CLI on a IDE**
- navigate to your MongoDB Clusters Sandbox
- click **"Connect"** button
- select **"Connect with the MongoDB shell"**
- select **"I have the mongo shell installed"**
- choose **mongosh (2.0 or later)** for : **"Select your mongo shell version"**
- choose option: **"Run your connection string in your command line"**
- in the terminal, paste the copied code `mongo "mongodb+srv://<CLUSTER-NAME>.mongodb.net/<DBname>" --apiVersion 1 --username <USERNAME>`
  - replace all `<angle-bracket>` keys with your own data
- enter password _(will not echo **\*\*\*\*** on screen)_

------

## Release History

We continually tweak and adjust this template to help give you the best experience. Here is the version history:

**June 18, 2024,** Add Mongo back into template

**June 14, 2024,** Temporarily remove Mongo until the key issue is resolved

**May 28 2024:** Fix Mongo and Links installs

**April 26 2024:** Update node version to 16

**September 20 2023:** Update Python version to 3.9.17.

**September 1 2021:** Remove `PGHOSTADDR` environment variable.

**July 19 2021:** Remove `font_fix` script now that the terminal font issue is fixed.

**July 2 2021:** Remove extensions that are not available in Open VSX.

**June 30 2021:** Combined the P4 and P5 templates into one file, added the uptime script. See the FAQ at the end of this file.

**June 10 2021:** Added: `font_fix` script and alias to fix the Terminal font issue

**May 10 2021:** Added `heroku_config` script to allow Heroku API key to be stored as an environment variable.

**April 7 2021:** Upgraded the template for VS Code instead of Theia.

**October 21 2020:** Versions of the HTMLHint, Prettier, Bootstrap4 CDN and Auto Close extensions updated. The Python extension needs to stay the same version for now.

**October 08 2020:** Additional large Gitpod files (`core.mongo*` and `core.python*`) are now hidden in the Explorer, and have been added to the `.gitignore` by default.

**September 22 2020:** Gitpod occasionally creates large `core.Microsoft` files. These are now hidden in the Explorer. A `.gitignore` file has been created to make sure these files will not be committed, along with other common files.

**April 16 2020:** The template now automatically installs MySQL instead of relying on the Gitpod MySQL image. The message about a Python linter not being installed has been dealt with, and the set-up files are now hidden in the Gitpod file explorer.

**April 13 2020:** Added the _Prettier_ code beautifier extension instead of the code formatter built-in to Gitpod.

**February 2020:** The initialisation files now _do not_ auto-delete. They will remain in your project. You can safely ignore them. They just make sure that your workspace is configured correctly each time you open it. It will also prevent the Gitpod configuration popup from appearing.

**December 2019:** Added Eventyret's Bootstrap 4 extension. Type `!bscdn` in a HTML file to add the Bootstrap boilerplate. Check out the <a href="https://github.com/Eventyret/vscode-bcdn" target="_blank">README.md file at the official repo</a> for more options.

------

## FAQ about the uptime script

**Why have you added this script?**

It will help us to calculate how many running workspaces there are at any one time, which greatly helps us with cost and capacity planning. It will help us decide on the future direction of our cloud-based IDE strategy.

**How will this affect me?**

For everyday usage of Gitpod, it doesn’t have any effect at all. The script only captures the following data:

- An ID that is randomly generated each time the workspace is started.
- The current date and time
- The workspace status of “started” or “running”, which is sent every 5 minutes.

It is not possible for us or anyone else to trace the random ID back to an individual, and no personal data is being captured. It will not slow down the workspace or affect your work.

**So….?**

We want to tell you this so that we are being completely transparent about the data we collect and what we do with it.

**Can I opt out?**

Yes, you can. Since no personally identifiable information is being captured, we'd appreciate it if you let the script run; however if you are unhappy with the idea, simply run the following commands from the terminal window after creating the workspace, and this will remove the uptime script:

```
pkill uptime.sh
rm .vscode/uptime.sh
```

**Anything more?**

Yes! We'd strongly encourage you to look at the source code of the `uptime.sh` file so that you know what it's doing. As future software developers, it will be great practice to see how these shell scripts work.

---

Happy coding!
