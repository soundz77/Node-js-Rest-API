import rateLimit from 'express-rate-limit';
import serverMessages from '../../utils/logging/messages/serverMessages.js';

// General rate limit: 60 requests per minute
const generalLimiter = {
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  message: serverMessages.errors.rateLimit,
};

// Authenticated users rate limit: 300 requests per minute
const authenticatedLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 300,
  message: serverMessages.errors.rateLimit,
});

// Login rate limit: 5 attempts per minute
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: 'Too many login attempts, please try again later.',
});

// Form submissions rate limit: 10 submissions per minute
const formLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: 'Too many form submissions, please try again later.',
});

export { generalLimiter, authenticatedLimiter, loginLimiter, formLimiter };