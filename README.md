# Care Chat Project

## Assumptions
1. Assuming we will need the history of the conversation, I am just giving one conversation thread, depending upon design and product decision, we can provide multiple threads in case the patient does not want to talk about something or has given some crappy information.

### Initial Design [Initial Design.pdf](https://github.com/user-attachments/files/15519772/Initial.Design.pdf)

## Features
1. It's a full stack project from Frontend in React, Backend in Express-Nodejs, and Database in Mysql.
2. The project is a chatbot named care chat which hits the open ai API in the backend to get answers to students query.
3. It uses JWT token authentication to login and send/receive data.
4. It sends the verification link using gmail smtp

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
1. Clone the repository
2. Open the terminal and move to /backend in the project
3. Use ```npm i``` to install all the dependencies for the project.
4. Edit the .env file in the backend and replace the values as needed
5. Run the server ```node server.js```
   
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
4. Edit the backend .env file and update the variables according to your system.
5. Set the openAi API key in the ~/.bash_profile with ```export OPENAI_API_KEY=`<key>'```
6. Start the server: `node server.js`

### Frontend
1. Navigate to the frontend directory: `cd chatbot-frontend`
2. Install dependencies: `npm install`
3. set the .env variables in frontend
4. Start the React development server: `npm start`
