# NewsExplorer App

This is a React responsive news article application allows users to search for any news information that's posted by any credible news company, keeping up with the latest and most popular news all over the world, covering a large amount of topics.

## Overview

The NewsExplorer app will provide links in the articles upon searching for a specific topic that will provide users with more information, as well as giving them the option to sign up/sign in order for them to save the articles or delete them if they no longer want in their account. The project works as follow:

- Users will insert a topic in the search field upon clicking the search button/ hitting enter, where they will recieve a response from the external API(Axios & External API).

- User will be able to see the articles as cards and browser throught them, having access to click on the title/ image to get more information on their topics by exitting our site and going to the main source.

- Providing a message for users to sign up upon overing over the savebutton that allows logged in users to save card articles.

- Extracting users information through the sign up and sign in forms and authenticating it through the backend request and displaying option to saved articles page in the header (Navlink &Router)

- Protecting the routes the allows signin users to navigate from the home page to the saved articles page, authorizing access to save and delete articles to the logged in users who have an account(Navigate & UseState).

- Displaying the numbers of articles being saved in the saved articles page(UseState).

- Being able to run and display the website for desktop, tablets and mobiles(Media Queries).

## Technology

- JavaScript
- React
- External API
- Fetch API
- Media Queries
- Router

## Backend Repository

The backend for the project can be found at:
("https://github.com/Noname2700/final_project_backend")

This backend provides:

- User authentication(register,login, JWT tokens)
- MongoDB integration
- Express.js REST API
- Password hashing(argon2)
- Cors
- Morgan and Winston(request logs and error logs)
- Ratelimit(to limit api request)
- Eslint(checking errors)
- Sanitize and Validation
- HttpOnly Cookies

## Deployment

This project is deployed on GitHub Pages:

- You can open the GitHub website page for this project by clicking on the following link:("https://noname2700.github.io/final_project_frontend/")

## Project Pitch Video

check out [(https://drive.google.com/file/d/1-Z66Y04SQVhly_fxOXIWgce0z0Td-zBC/view?usp=sharing)]
where I describe my project and some challenges I faced while building the frontend side of this News Article App.
