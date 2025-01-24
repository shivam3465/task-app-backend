## Frontend Repository

The frontend code for this project can be found [here](https://github.com/shivam3465/task-app-frontend).


# Node.js Backend API

## Description

This is the backend server built with Node.js , express.js and provides a set of RESTful APIs for authentication, task management, and social post management. The server handles user authentication, CRUD operations for tasks, and social post functionalities.

---

## Features Implemented

### Authentication APIs
- **POST** `/register`  
  Allows users to create an account by providing their name, email, and password.  

- **POST** `/login`  
  Authenticates users with their email and password and returns an access token.  

- **POST** `/forgot-password`  
  Sends an OTP to the user's registered email for password reset.  

- **POST** `/validate-otp`  
  Verifies the OTP sent to the user's email and allows them to set a new password.  

- **POST** `/logout`  
  Logs the user out by invalidating their session or token.

---

### Task Management APIs
- **GET** `/tasks/all`  
  Fetches all tasks associated with the authenticated user.  

- **POST** `/tasks/create`  
  Creates a new task with a name and description.  

- **PUT** `/tasks/update`  
  Updates the details or status of an existing task.  

- **DELETE** `/tasks/delete`  
  Deletes a task by its ID after confirmation.

---

### Social Post APIs
- **POST** `/posts/create`  
  Allows users to create a new post with a photo (stored via Cloudinary) and a caption.  

- **GET** `/posts/all`  
  Retrieves all posts, including those created by other users.  

- **DELETE** `/posts/delete`  
  Deletes a specific post by ID, restricted to the user who created it.

---

## Steps to Run the Project

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/shivam3465/task-app-backend
   cd task-app-backend
   ```

2. **Install Dependencies**:  
   Ensure `Node.js` and `npm` are installed, then run:  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and add the following variables:  
   ```env
   PORT=4000  
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   CLOUD_NAME=<your-cloudinary-cloud-name>
   API_KEY=<your-cloudinary-api-key>
   API_SECRET=<your-cloudinary-api-secret>
   SMTP_HOST=<your-smtp-host>
   SMTP_PORT=<your-smtp-port>
   SMTP_USER=<smtp-user>
   SMTP_PASSWORD=<your-smtp-password
   MYMAIL=<your-setuped-email-from-smtp>
   ```

4. **Start the Server**:  
   Run the following command to start the server:  
   ```bash
   npm start
   ```
   Alternatively, for development with live-reloading, use:  
   ```bash
   npm run dev
   ```

5. **Access the API**:  
   The API will be accessible at `http://localhost:4000>` (replace `<PORT>` with the value defined in your `.env` file).

---

## API Endpoints Overview  

### Authentication APIs
| Method | Endpoint          | Description                              |
|--------|-------------------|------------------------------------------|
| POST   | `/register`       | Register a new user                     |
| POST   | `/login`          | Log in a user                           |
| POST   | `/forgot-password`| Send OTP for password reset             |
| POST   | `/validate-otp`   | Validate OTP and reset password         |
| POST   | `/logout`         | Log out the user                        |

### Task Management APIs
| Method | Endpoint          | Description                              |
|--------|-------------------|------------------------------------------|
| GET    | `/tasks/all`      | Fetch all tasks for the user            |
| POST   | `/tasks/create`   | Create a new task                       |
| PUT    | `/tasks/update`   | Update an existing task                 |
| DELETE | `/tasks/delete`   | Delete a task                           |

### Social Post APIs
| Method | Endpoint          | Description                              |
|--------|-------------------|------------------------------------------|
| POST   | `/posts/create`   | Create a new post                       |
| GET    | `/posts/all`      | Fetch all posts                         |
| DELETE | `/posts/delete`   | Delete a user's post                    |

---

## Dependencies

- **Express**: For creating RESTful APIs.
- **Mongoose**: For interacting with MongoDB.
- **jsonwebtoken**: For user authentication and authorization.
- **Cloudinary **: For managing photos in social posts and media upload.
- **dotenv**: For managing environment variables.

---

Feel free to update the `.env` variables and run the server to integrate it with your frontend!

Let me know if you’d like to tweak or add anything further. 😊
