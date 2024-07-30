import jwt from 'jsonwebtoken';

const refreshJWT = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const payload = { id: user.id, username: user.username, avatar: user.avatar, email: user.email };
        const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Issue a new refresh token here and update the cookie
        const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
     });


        // Set new access token in the `Authorization` header
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        res.status(200).json({ accessToken: newAccessToken });
    });

};

export default refreshJWT;
