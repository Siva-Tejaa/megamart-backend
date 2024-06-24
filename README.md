# MegaMart Backend

This is the backend for the MegaMart e-commerce application, built using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/megamart-backend.git
   cd megamart-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```plaintext
   PORT=8000
   MONGODB_URL=The connection URL for MongoDB with username and password
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The server will be running on `http://localhost:8000`.

## API Endpoints

- **Authentication**

  - `POST /api/auth/signup` - Register new user
  - `POST /api/auth/signin` - Signin existing user
  - `GET /api/auth/signout` - Signout loggedin user

- **Refresh Token**

  - `POST /api/refresh-token` - Generates new Access Token valid for 1 Hour using the refresh token from cookies

- **User**

  - `GET /api/users/me` - get user profile details
  - `PUT /api/users/me` - Update user profile

## Environment Variables

The following environment variables are required to run the application:

- `PORT`: The port number the application will run on.
- `MONGODB_URL`: The connection URL for MongoDB with username and password.

Create a `.env` file in the root directory and add the above variables.
