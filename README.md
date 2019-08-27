# IRC Report System

## Overview

This inventory system is being developed as a pilot system for the Atlanta office of IRC. It is meant to track inventory usage at their shopfront, and log volunteer hours. Further, it can create reports regarding contributions, month over month.

## Setup
Requirements: Have node.js and npm installed.

 1. Clone the git repository.
 2. In the \irc folder (main folder) run `npm install`
 3. In \frontend-material run `npm install`
 4. In \backend folder run `npm install` (might just perform an audit)
 5. In \irc create a file called .env
 6. Set DB_USER and DB_PASS in the .env file (message [Sukhmai](https://github.com/Sukhmai) for credentials)

## Running the Program
1. In the \irc folder run `npm start`
2. Open a new terminal instance and navigate to \frontend-material
3. Run `npm start` in \frontend-material
4. After 20-30 seconds, the frontend should popup in your browser. Otherwise try to navigate to localhost:3000
5. If you encounter any errors, verify if you completed the setup correctly. Otherwise, message me :)

## Structure

The program is divided into two folders.

 - Frontend-Material: Controls the ui and sends requests to the backend.
 - backend: Interacts with the database, provides data to the frontend

The backend starts by running server.js.

## Backend API Docs
Message [Bryce](https://github.com/Navbryce) if you have questions [about the API docs](https://app.swaggerhub.com/apis-docs/navbryce/irc/1.0.0)
