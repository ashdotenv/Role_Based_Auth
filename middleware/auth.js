import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (verified) {
            req.user = req.user || {};
            req.user.role = verified.role;
            req.user.id = verified.id;
            next();
        }
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(401).json({ err: "This is a Proteceted Route" })
    }
    next()
}
export const isUser = (req, res, next) => {
    if (req.user.role !== "User") {
        return res.status(401).json({ err: "This is a Proteceted Route" })
    }
    next()
}