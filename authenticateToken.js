import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const authorizeRole = (roles) => (req, res, next) => {
    authenticateToken(req, res, () => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    });
};



export default authenticateToken;
