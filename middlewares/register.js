import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Winston logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '..', 'error.log') })
  ]
});

export function validateRegistration(req, res, next) {
  const { firstName, lastName, password, email, phoneNumber } = req.body;
  const errors = [];

  // Validation checks
  if (!firstName || firstName[0] !== firstName[0].toUpperCase()) {
    errors.push('First letter of first name must be capitalized');
  }
  if (!lastName || lastName[0] !== lastName[0].toUpperCase()) {
    errors.push('First letter of last name must be capitalized');
  }

  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    errors.push('Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long');
  }

  if (!email || !email.includes('@')) {
    errors.push('Invalid email address');
  }

  if (!phoneNumber || phoneNumber.length < 10) {
    errors.push('Phone number must be at least 10 digits long');
  }

  // If there are errors, create an error object and pass it to the error handler
  if (errors.length > 0) {
    const error = new Error('Validation failed');
    error.details = errors; // Add the array of errors to the error object
    return next(error);
  }

  next();
}

export function errorHandler(err, req, res, next) {
  console.log('Error occurred:', err.details || err.message);  // Log all errors to console

  if (err.details) {
    // Log each validation error using Winston
    err.details.forEach((detail) => {
      logger.error(detail);
    });

    // Return all validation errors to the client
    return res.status(400).json({ errors: err.details });
  }

  // For other errors, log the single error message
  logger.error(err.message);

  res.status(400).json({ error: err.message });
}


//   export function errorHandler(err, req, res, next) {
//     const logMessage = `${new Date().toISOString()} - ${err.message}\n`;
//     const logFilePath = path.join(__dirname, "..", 'error.txt');

//     fs.appendFile(logFilePath, logMessage, (fileErr) => {
//         if (fileErr) {
//             console.error('Error writing to log file:', fileErr); // Log the actual file error
//         } else {
//             console.log('Error logged successfully:', logMessage);
//         }
//     });

//     res.status(400).json({ error: err.message });
// }
