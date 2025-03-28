# React User Authentication and Management App

This is a simple React application that provides user authentication and user management functionality. The app allows users to log in, view a list of users, edit user details, and delete users.

## Features
- User login authentication using `reqres.in` API
- Persistent authentication using `localStorage`
- Display a paginated list of users fetched from an API
- Edit and update user details
- Delete users from the list
- Logout functionality

## Tech Stack
- React.js
- React Router
- Axios
- Tailwind CSS




## API Endpoints Used
- **Login API:** `POST https://reqres.in/api/login`
- **User List API:** `GET https://reqres.in/api/users?page={page}`
- **Update User API:** `PUT https://reqres.in/api/users/{id}`
- **Delete User API:** `DELETE https://reqres.in/api/users/{id}`

## Functionality

### Login Page (`Login.js`)
- Users enter their email and password.
- On successful login, a token is stored in `localStorage`.
- Redirects to the `UserList` page.
- Shows an error message for invalid credentials.

### User List Page (`UserList.js`)
- Fetches and displays a list of users from the API.
- Allows users to edit details (first name, last name, email).
- Users can be deleted from the list.
- Provides pagination functionality.
- Logout button removes token and redirects to the login page.


### Project Link - (https://employee-wise-pankaj.vercel.app/)