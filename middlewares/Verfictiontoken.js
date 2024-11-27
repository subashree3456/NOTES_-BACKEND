import jwt from 'jsonwebtoken'
import UserModel from '../models/Auth.js';


const VerfictonToken = async (req, res, next) => {

    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(303).json({ success: false, message: "Unauthorized, please login" });

        }

        const decoded = await jwt.decode(token, process.env.SecreateKey)
        const user = await UserModel.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
          }
          req.userId=user._id
          next()

      

    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}


export { VerfictonToken }


  // console.log(user)