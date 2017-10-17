export default {
  key: process.env.SECRET_KEY || 'NeverShareYourSecret',
  expirationTime: 24 * 60 * 60 * 1000,
};
