# TwitchLite

## Table of Contents

- [TwitchLite](#twitchlite)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)
  - [License](#license)
  - [Screenshots](#screenshots)

## Overview

TwitchLite is a modern streaming platform designed to provide users with a seamless experience for creating, viewing, and managing live streams. Built with React, Redux, and Node.js, TwitchLite offers a user-friendly interface and robust backend architecture to support a variety of streaming needs.

![twitchlite](https://i.imgur.com/4zGk75J.png)

## Features

- **User Authentication**: Secure user authentication system allows users to sign up, sign in, and sign out securely.
- **Stream Creation**: Easily create new streams by providing a title and description.
- **Stream Viewing**: Browse a curated list of live streams and view stream details such as title and description.
- **Stream Management**: Stream owners can edit and delete their own streams for full control over their content.
- **Real-Time Messaging**: Implement real-time messaging using WebSockets to enhance user engagement and interaction.
- **Responsive Design**: Ensure a seamless experience across devices with responsive design principles.

## Installation

To run TwitchLite locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies for the client application:
   ```bash
   cd twitchlite/client
   npm install
   ```
3. Install dependencies for the API server:
   ```bash
   cd ../api
   npm install
   ```
4. Install dependencies for the RMTP server:
   ```bash
   cd ../rmtpserver
   npm install
   ```
5. Start the RMTP server:
   ```bash
   npm start
   ```
6. Start the API server:
   ```bash
   cd ../api
   npm start
   ```
7. Start the client application:
   ```bash
   cd ../client
   npm start
   ```
8. Access TwitchLite in your web browser at `http://localhost:3000`.

## Usage

Once TwitchLite is up and running, users can perform the following actions:

- **Sign Up / Sign In**: New users can sign up for an account, while existing users can sign in securely.
- **Browse Streams**: Explore a list of live streams and select streams to view.
- **Create Streams**: Streamers can create new streams by providing a title and description.
- **Manage Streams**: Stream owners can edit or delete their streams as needed.

## API Documentation

TwitchLite offers a RESTful API to interact with streams. The following endpoints are available:

- `GET /streams`: Retrieve a list of all streams.
- `GET /streams/{id}`: Retrieve details of a specific stream.
- `POST /streams`: Create a new stream.
- `PATCH /streams/{id}`: Update an existing stream.
- `DELETE /streams/{id}`: Delete a stream.

---

## Screenshots

![twitchlite](https://i.imgur.com/cYqpCfD.png)

![twitchlite](https://i.imgur.com/TzNTKZ6.png)

![twitchlite](https://i.imgur.com/v4CFTMp.png)

![twitchlite](https://i.imgur.com/xRzz3pc.png)

![twitchlite](https://i.imgur.com/ilpe6gT.png)

![twitchlite](https://i.imgur.com/E4shXa8.png)

![twitchlite](https://i.imgur.com/3ayC5W4.png)

![twitchlite](https://i.imgur.com/4zGk75J.png)
