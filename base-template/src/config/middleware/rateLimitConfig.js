import rateLimit from 'express-rate-limit';
import serverMessages from '../../utils/logging/messages/serverMessages.js';

const createRateLimiter = (windowMs, maxRequests) => rateLimit({
  windowMs,
  max: maxRequests,
  message: serverMessages.errors.rateLimit,
});

// Applied by default on all routes
const generalLimiter = Object.freeze({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100,
  message: serverMessages.errors.rateLimit,
});

// const generalLimiter = createRateLimiter(60, 1 * 60 * 1000);
const authenticatedLimiter = createRateLimiter(300, 1 * 60 * 1000);
const loginLimiter = createRateLimiter(5, 1 * 60 * 1000);
const formLimiter = createRateLimiter(10, 1 * 60 * 1000);


export { generalLimiter, authenticatedLimiter, loginLimiter, formLimiter };
