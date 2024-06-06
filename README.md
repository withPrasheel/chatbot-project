# Care Chat Project

## Assumptions
1. Assuming we will need the history of the conversation, I am just giving one conversation thread, depending upon design and product decision, we can provide multiple threads in case the patient does not want to talk about something or has given some crappy information.
2. 

### Initial Design [Initial Design.pdf](https://github.com/user-attachments/files/15519772/Initial.Design.pdf)

## Demo
[![Watch the video](https://img.youtube.com/vi/iBw9Sy5kY8I/0.jpg)](https://youtu.be/iBw9Sy5kY8I)


# DB Setup
1. Install mysql
2. create a db named chatbot_db
3. Run the following queries to build the tables
```sql
CREATE TABLE `Conversations` (
  `messageId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `message` text NOT NULL,
  `isUserMessage` tinyint(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`messageId`),
  KEY `userId` (`userId`),
  CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `reqCount` int DEFAULT '0',
  `lastLoginTimeStamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) NOT NULL,
  `isVerified` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Mysql
- brew services start mysql
- brew services stop mysql
- brew services restart mysql

## Backend
1. Open the terminal and move to /backend in the project
2. Use ```npm i``` to install all the dependencies for the project.
3. Edit the .env file in the backend and replace the values as needed
4. Run the server ```node server.js```
   
## Overview
This project is a full-scale chatbot interface developed as a technical take-home assessment for a Software Engineering (SWE) Intern position. It includes user authentication, a chat interface, conversation functionality, and integration with the OpenAI API.

## Features
- User authentication with email confirmation
- Real-time chat interface
- Conversation history stored in a SQL database
- Integration with OpenAI API for chatbot responses

## Setup

### Backend
1. Clone the repository
2. Navigate to the backend directory: `cd chatbot-project`
3. Install dependencies: `npm install`
4. Create a `.env` file and add the following environment variables:

5. Start the server: `node server.js`

### Frontend
1. Navigate to the frontend directory: `cd chatbot-frontend`
2. Install dependencies: `npm install`
3. Start the React development server: `npm start`

## Deployment
Provide steps to deploy the application (e.g., using Heroku or another cloud provider).

## Additional Documentation
Include any additional documentation such as API endpoints, database schema, and instructions for running tests.

## Contact
If you have any questions, please reach out to [your-email@example.com](mailto:your-email@example.com).



// Frontend Readme 
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
