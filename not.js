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
const fcmToken = 'c0gjtk8OAUj3DrmO_eCEwF:APA91bFVkmJkwrheCf-Lao_XwPFFJfrU2slGDJKVqhHPOgG9u9ZK5iGmFlC4DGO-XhX9gsUjVYyqfMrcWag0_UuQZMl2Xbsxghe8DTZsQXRf80O8XLWfMhCQzheoiJ4odJgJDoZUdLvP'; // Retrieve from your database
const notificationPayload = {
  title: 'Hello Sir',
  body: 'I am shashank shukla',
 
};

sendPushNotification(fcmToken, notificationPayload);
