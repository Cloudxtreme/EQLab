module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || '7fe2aa4c-44fc-4fe1-bb2f-6365c34b4b2b',
    options: {
      issuer: 'eqlab'
    }
  }
};