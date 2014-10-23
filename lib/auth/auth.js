module.exports = {
  'googleAuth': {
    'clientID': '422553778057-srcd3hd0v33b9ehacuavuoqhqb3gceo3.apps.googleusercontent.com',
    'clientSecret': 'wQI1Mn11VwnEjQ77piCjqqM9',
    'callbackURL': 'http://localhost:3000/auth/google/callback'
  },
  jwtOptions: {
    secret: process.env.JWT_SECRET || 'mysharrrreeeddddsecretttttt',
    issuer: 'mini-weebly',
    expiresInMinutes: 60
  }
};
