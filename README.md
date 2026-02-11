# NewsExplorer App

This is a React responsive news article application allows users to search for any news information that's posted by any credible news company, keeping up with the latest and most popular news all over the world, covering a large amount of topics.

## Overview

The NewsExplorer app will provide links in the articles upon searching for a specific topic that will provide users with more information, as well as giving them the option to sign up/sign in order for them to save the articles or delete the article they no longer want in their account . The project works as follow:

- Users will insert a topic in the search field upon clicking the search button/ hitting enter where they will recieve a response from the external API 

- 

- To build this functionality, we structured our components with the necessary data to display articles as cards. We began by creating the page layout and breaking it into sections based on the Figma design. After styling the layout, we obtained a News API key to enable article searches. We created and tested the fetch requests using Postman to ensure the API worked correctly.

- Next, we built the user authentication forms and added validation to ensure users entered proper credentials before gaining access to saving articles. Conditional rendering was used throughout the app to control access—showing or hiding the save/delete buttons, the “Saved Articles” link in the header, and other UI elements depending on whether the user was signed in.

- We then set up routing to make all navigation links function correctly, including two footer links that lead to external sources. After testing the routes, we focused on responsiveness. We implemented a custom on‑screen keyboard that appears when users interact with text inputs on mobile devices. To support this, we added a utility file that detects whether the device is touch‑enabled, allowing the keyboard to adapt across different platforms.
- Finally, we matched the app’s layout to the Figma design, added the required fonts, and applied consistent styling across all components to complete the project.

## Technology

- Navlink
- UseState
- External API
- Axios
- Media Queries
- Router
- Navigate

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
