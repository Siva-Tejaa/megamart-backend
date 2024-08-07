# MegaMart(MM) Backend

This is the backend for the MegaMart e-commerce application, built using Node.js, Express.js, and MongoDB. The application handles user authentication, product management, order processing, and more.

## Production API Link

Production API Link : in progress...

<!-- [https://mega-mart-lgq3.onrender.com](https://mega-mart-lgq3.onrender.com) -->

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Siva-Tejaa/megamart-backend.git
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
   JWT_ACCESS_SECRET=Secret key for generating and verifying the JWT Access token
   JWT_REFRESH_SECRET=Secret key for generating and verifying the JWT Refresh token
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
  - `POST /api/auth/signout` - Signout loggedin user

- **Refresh Token**

  - `POST /api/refresh-token` - Generates new Access Token valid for 1 Hour using the refresh token from cookies

- **Products**

  - `GET /api/products` - Get All Products
  - `GET /api/products/:productid` - Get Single Product details

- **User**

  - `GET /api/users/me` - Get User profile details
  - `PUT /api/users/me` - Update user profile

- **Customer**

  - `POST /api/customers/me/cart` - Add/Increase an item to the cart
  - `GET /api/customers/me/cart` - Get all Cart Items
  - `PUT /api/customers/me/cart/:productId` - Decrease Item Quantity from Cart
  - `DELETE /api/customers/me/cart/:productId` - Remove an Item from Cart
  - `DELETE /api/customers/me/cart` - Remove all Items from Cart

  - `POST /api/customers/me/orders` - Place Order
  - `GET /api/customers/me/orders` - Get All Orders

  - `GET /api/customers/me/wishlist` - Get All Wishlist Items
  - `POST /api/customers/me/wishlist` - Add/Remove Product to WishList Items

- **Seller**

  - `POST /api/sellers/me/products` - Add/Create New Product
  - `GET /api/sellers/me/products` - Get Seller Own Products
  - `GET /api/sellers/me/orders` - Get All Seller Orders

- **Admin**

  - `GET /api/admin/customers` - Get all customer details
  - `GET /api/admin/customers/:customerId/orders` - Get Customer Orders by Customer ID

  - `GET /api/admin/sellers` - Get all Seller details
  - `GET /api/admin/sellers/:sellerId/products` - Get Seller Products by Seller ID
  - `GET /api/admin/sellers/:sellerId/orders` - Get Seller Orders by Seller ID

## Environment Variables

The following environment variables are required to run the application:

- `PORT`: The port number the application will run on.
- `MONGODB_URL`: The connection URL for MongoDB with username and password.
- `JWT_ACCESS_SECRET`: Secret key for generating and verifying the JWT Access token
- `JWT_REFRESH_SECRET`: Secret key for generating and verifying the JWT Refresh token

Create a `.env` file in the root directory and add the above variables.
