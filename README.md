# Manji's Blogs
  
  [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)]

## Description

The project is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. The app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Features](#features)

## Installation

Install NodeJS. Also install the following as dependencies: 'bcrypt v5.0.0','bootstrap v5.3.1', 'bootstrap-icons v1.10.5', 'connect-session-sequelize v7.0.4','dayjs v1.11.9', 'dotenv v8.2.0', 'express v4.17.1', 'express-handlebars v5.2.0', 'express-session v1.17.1','mysql2 v2.2.5', ''sequelize v6.3.5".


## Usage

To run the application, do the following actions:
1. Go to folder db, and open integrated terminal and login to mysql using 'mysql -u root -p' command.
2. Source schema.sql to create your database.
3. Go to the main folder and open intergrated terminal.
4. Execute 'npm i' to install all dependencies.
5. Execute 'npm start'.

Heroku link: 

## License

License: [ISC License (ISC)](https://opensource.org/licenses/ISC)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)]


## Credits

https://getbootstrap.com/docs/4.0/components/forms/ 

https://sequelize.org/docs/v6/getting-started/

https://www.restapitutorial.com/lessons/httpmethods.html#google_vignette

https://www.geeksforgeeks.org/model-view-controllermvc-architecture-for-node-applications/

## Features

* When user visit the CMS-style blog site for the first time, user ispresented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in.
* Clicking on the homepage option, user is taken to the homepage.
* Click on any other links in the navigation, user is prompted to either sign up or sign in.
* Choose to sign up, user is prompted to create a username and password.
* Click on the sign-up button, user credentials are saved and I am logged into the site.
* Revisit the site at a later time and choose to sign in, user is prompted to enter my username and password.
* WHEN user is signed in to the site, they see navigation links for the homepage, the dashboard, and the option to log out.
* Click on the homepage option in the navigation, user is taken to the homepage and presented with existing blog posts that include the post title and the date created.
* Click on an existing blog post, user is presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment.
* Enter a comment and click on the submit button while signed in, the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
* Click on the dashboard option in the navigation, user is taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post.
* Click on the button to add a new blog post, user is prompted to enter both a title and contents for my blog post.
* Click on the button to create a new blog post, the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post.
* Click on one of my existing posts in the dashboard, user has the option to delete or update my post and taken back to an updated dashboard.
* Click on the logout option in the navigation, user is signed out of the site.
* WHEN user is idle on the site for more than a set time, user is able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts..









