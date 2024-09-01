# Express.js Registration API

This is a simple Express.js API that handles user registration, validates input data, and logs errors using the Winston logging library.

## Features

- **User Registration:** Allows users to register by providing their first name, last name, email, password, and phone number.
- **Validation:** Ensures that all input data meets specific validation criteria:
  - First and last names must start with a capital letter.
  - Passwords must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long.
  - Email addresses must include an "@" symbol.
  - Phone numbers must be at least 10 digits long.
- **Error Logging:** All validation and runtime errors are logged using the Winston library into an `error.log` file.
- **Error Handling:** Returns detailed validation error messages to the client, allowing multiple errors to be corrected at once.

## Prerequisites

Before running this project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaverickCod/WT-3_MIDDLEWARE.git
   cd WT-3_MIDDLEWARE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:6969`.

## Usage

### API Endpoints

- **`GET /`**: Returns a simple message indicating that the server is working.

- **`POST /register`**: Registers a user with the following JSON body:
  ```json
  {
    "firstName": "Prem",
    "lastName": "Chavan",
    "email": "test@gmail.com",
    "password": "Password@123",
    "phoneNumber": "1234567890"
  }
  ```

  **Validation Errors:**
  If any of the validation rules are not met, the API will return a `400` status with an array of error messages. Example:
  ```json
  {
    "errors": [
      "First letter of first name must be capitalized",
      "Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long",
      "Invalid email address"
    ]
  }
  ```

### Logging

All errors, including validation errors, are logged to an `error.log` file located in the root directory of the project. The log entries include a timestamp and the error message.

## Project Structure

```bash
├── middlewares
│   └── register.js   # Contains validation and error handling middleware
├── index.js          # Main entry point of the application
├── error.log         # Log file for errors (created after the first error occurs)
└── package.json      # Project configuration and dependencies
```

## Dependencies

- [Express](https://expressjs.com/) - Web framework for Node.js
- [Winston](https://github.com/winstonjs/winston) - Logging library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
