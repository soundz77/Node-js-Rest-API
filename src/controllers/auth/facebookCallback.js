import passport from "passport";
import FacebookStrategy from "../../config/passportFacebook.js"; // required
import jwt from "jsonwebtoken";

const facebookCallback = (req, res) => {
            if (req.user) {
                const token = jwt.sign(
                    {
                        id: req.user.id,
                        username: req.user.username,
                        email: req.user.email,
                        avatar: req.user.avatar || "1.png"
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.redirect(`http://localhost:3000/authSuccess?token=${token}`);
            } else {
                res.redirect('http://localhost:3000/login');
            }
        };

export default facebookCallback;