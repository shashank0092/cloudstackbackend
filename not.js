const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('./serviceAccountKey.json'),
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
const fcmToken = 'e2aRsgPOoPNRKv9xczD4Lv:APA91bEHYnhd_tdhynEWMa_5SLnkRihN6fbaEb9enc4ijU7fsW-9s7WyATVu0Wq2d48tzt2wCMY_wlDyIHksHlyo13CcFDJSvMNhItxXS7i20jUjqxnUgI77TygFuEvE8sxzP0EPmDAH'; // Retrieve from your database
const notificationPayload = {
  title: 'Hello Sir',
  body: 'I am shashank shukla',
  data: {
    
  },
};

sendPushNotification(fcmToken, notificationPayload);
