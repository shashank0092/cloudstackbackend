const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cloudstack-edd72.firebaseio.com',
});

const sendPushNotification = (fcmToken, payload) => {
    const message = {
        token:fcmToken,
        notification: {
            title: payload.title,
            body: payload.body,
        },
        data: payload.data,
        
    };

    admin.messaging().send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.error('Error sending message:', error);
        });
};


const Register = async (req, res) => {
    const { email, username, password, FCMToken } = req.body;

    if (!email || !username || !password || !FCMToken) {
        return res.json({ message: "Please Give All Details" }).status(400)
    }
    try {
        const user = await User.findOne({ email: email })

        if (user) {
            return res.json({ message: "This Email Is Already Register" }).status(400)
        }
        else {
            const hasedPassword = await bcrypt.hash(password, 12)
            const newUser = await User.create({ email, username, password: hasedPassword})
            return res.json({ message: "Succesfully Register" }).status(200)
        }
    }

    catch (err) {
        console.log(err)
    }
}


const Login = async (req, res) => {
    const { userdetails, password } = req.body;

    if (!userdetails || !password) {
        return res.json({ message: "All Fileds Are Required" })
    }

    try {
        const user = await User.findOne({ $or: [{ username: userdetails }, { email: userdetails }] })

        if (user) {
            const isPassMatching = await bcrypt.compare(password, user.password)

            if (!isPassMatching) {
                return res.status(412).json({ message: "Invalid Details" })
            }
            else {
                const payload = { username: user.username, email: user.email }
                const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" })  
                return res.json({ token: token, username: user.username, message: "Succesfully Login" }).status(200);
            }
        }
        else {
            return res.json({ message: "Please First Register" }).status(201)
        }

    }

    catch (err) {
        console.log(err)
    }
}

const Profile = async (req, res) => {
 
    jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
        
        if (err) {
            
            return res.json({ message: "Not A valid User" }).status(401)
        }
        else {
         
            const { userdetails,fcmToken } = req.body;
            
            const token = req.headers['authorization']

            if (!userdetails || !token||!fcmToken) {
                return res.json({ message: "Please Login Agian" })
            }

            else {
                const user = await User.findOne({ $or: [{ username: userdetails }, { email: userdetails }] })
                
                 
                const notificationPayload = {
                    title: 'Hello Sir',
                    body: 'I am shashank shukla',
                    
                };
               
                if (!user) {

                    return res.json({ message: "Please Give Valid User Details" }).status(201)
                }
                else {
                    sendPushNotification(fcmToken, notificationPayload);
                    return res.json({ message: "Valid User", data: user })
                }
            }
        }
    })

}

module.exports = { Register, Login, Profile }