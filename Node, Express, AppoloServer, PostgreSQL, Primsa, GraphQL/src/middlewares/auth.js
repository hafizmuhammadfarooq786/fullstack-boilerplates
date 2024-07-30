const jwt = require('jsonwebtoken');

const JWT_SECRET = 'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMDAwMDM0OCwiaWF0IjoxNzAwMDAwMzQ4fQ'

const generateToken = async (user) => {
    try {
        const token = await jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;
    } catch (ex) {
      throw new Error('Invalid token.');
    }
};

const authContext = async ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token){
        return {};
    };
    
    try {
        const decoded = await jwt.verify(token, 'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMDAwMDM0OCwiaWF0IjoxNzAwMDAwMzQ4fQ');
        return { user: decoded };
    } catch (ex) {
      throw new Error('Invalid token.');
    }
};
module.exports = { generateToken, authContext };