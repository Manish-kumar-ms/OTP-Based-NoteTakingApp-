import jwt from 'jsonwebtoken'

export const ensureAuthenticated = (req, res, next) =>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Verify token and attach user to request
       const decoded=jwt.verify(token,process.env.JWT_SECRET)
       req.user=decoded
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}