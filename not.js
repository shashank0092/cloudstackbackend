const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cloudstack-edd72.firebaseio.com',
});

// Send a push notification to a specific FCM token
const sendPushNotification = (fcmToken, payload) => {
  const message = {
    token: fcmToken,
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: payload.data, // Additional data to send to the app
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
};

// Example usage
const fcmToken = 'dhUQ2p6dhS5N-gGeg4DP8b:APA91bG3-pB7MolXw6XxJSSy2pAkKX7ck_-AE--ebXIwrxVzpjK3qFiMz9BJ3CUANhYBPi6Yx_EkpYRmylr9uRol9_-0xCcnN6wvL75val1T2mzS4L4Bdu9umRJC-3t2x83i0bFplapX'; // Retrieve from your database
const notificationPayload = {
  title: 'Hello Sir',
  body: 'I am shashank shukla',
 
};

sendPushNotification(fcmToken, notificationPayload);
