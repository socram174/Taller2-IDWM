import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    if (token.startsWith('Bearer ')) {
      const tokenValue = token.slice(7).trim();
      jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        
        req.user = decoded;
        next();
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized - Invalid token format' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
