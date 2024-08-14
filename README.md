# Frim Cloud (cloud.frim.io)

With Frim Cloud, you can easily manage your workload, maintain customer relationships, and better understand your business. This all-in-one, cloud platform solution is the key to the success of any small to medium-sized business.

## Requirements

- **Use the latest stable version of Node.js, Express.js, and React.js.** Ensure compatibility with current features and libraries.
- **Backend Dependencies:** Body-Parser, CORS, dotenv
- **Frontend Dependencies:** Auth0, React Hooks, React Router DOM, Axios
- **Database:** PostgreSQL (latest version)
- **Deployment:** Render Cloud Application Hosting (Static Sites and Web Services)

## Installation

### Backend Installation

1. **Navigate to the backend directory:**

    ```bash
    cd server
    ```

2. **Initialize the Node.js project (if not already done):**

    ```bash
    npm init -y
    ```

3. **Install the required backend dependencies:**

    ```bash
    npm install express body-parser cors dotenv
    ```

4. **Install `nodemon` for development:**

    ```bash
    npm install --save-dev nodemon
    ```

5. **Update `package.json` to use `nodemon` for running the server:**

    Edit the `scripts` section of `package.json` to include:

    ```json
    "scripts": {
      "start": "node src/index.js",
      "dev": "nodemon src/index.js"
    }
    ```

    - `start` will run the production server.
    - `dev` will use `nodemon` to watch for changes and automatically restart the server during development.

6. **Create a `.env` file for environment variables (e.g., database connection strings, Auth0 secrets):**

    ```bash
    touch .env
    ```

### Frontend Installation

1. **Navigate to the frontend directory:**

    ```bash
    cd client
    ```

2. **Create a new React project (if not already done) using Create React App:**

    ```bash
    npx create-react-app .
    ```

3. **Install the required frontend dependencies:**

    ```bash
    npm install @auth0/auth0-react react-router-dom axios
    ```

## Running the Application

- **Start the backend server:**

    For development:

    ```bash
    npm run dev
    ```

    For production:

    ```bash
    npm start
    ```

- **Start the frontend development server:**

    ```bash
    npm start
    ```

    This will launch the React app in development mode, typically accessible at `http://localhost:3000`.

## Deployment

- **Backend Deployment:** Deploy the backend to Render Cloud or other cloud platforms. Ensure that the production environment variables are correctly set.

- **Frontend Deployment:** Deploy the static site to Render Cloud or other hosting services. Make sure to set up the environment variables and API base URLs appropriately for production.

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This project is proprietary to Frim Technologies and is intended for internal use only. Unauthorized use, distribution, or duplication is prohibited.

## Public Documentation

For public documentation, please visit [frim.io/docs](https://frim.io/docs).

## Contact

For inquiries, please contact us at [frim.io/contact](https://frim.io/contact).