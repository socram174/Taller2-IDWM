import jwt from 'jsonwebtoken';


// Middleware para verificar el token que viene en el header de la petición
export const verifyToken = (req, res, next) => {
  try {
    // Se obtiene el token del header de la petición
    const token = req.header('Authorization');

    // Si no existe el token se retorna un error
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    // Si existe el token se verifica que venga en el formato correcto
    if (token.startsWith('Bearer ')) {
      const tokenValue = token.slice(7).trim();
      jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
        // Si el token es invalido se retorna un error
        if (err) {
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        
        // Si el token es valido se guarda el id del usuario en el objeto req y se llama a la siguiente función
        req.user = decoded;
        next();
      });
    } else {
      // Si el token no viene en el formato correcto se retorna un error
      return res.status(401).json({ message: 'Unauthorized - Invalid token format' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
