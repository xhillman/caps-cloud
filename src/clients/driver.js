'use strict';

const { Consumer } = require('sqs-consumer');
// const { Producer } = require('sqs-producer');

// const {Chance} = require('chance');
// const chance = new Chance();

// let queueUrl;
// let orderID;

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/143451010179/packages.fifo',
  handleMessage: async (message) => {
    let parsedBody = JSON.parse(message.Body);
    let pickupMessage = parsedBody.Message;
    let parsedMessage = JSON.parse(pickupMessage);
    // queueUrl = parsedMessage.VendorID;
    // orderID = parsedMessage.OrderID;
    console.log('Message ------', parsedMessage);
  },
});

// console.log('URL ------- ', queueUrl);

// const producer = Producer.create({
//   queueUrl: 'https://sqs.us-east-1.amazonaws.com/143451010179/acmeQueue',
//   region: 'us-east-1',
// });

// let payload = {
//   id: '1234',
//   body: `Order Delivered`,
//   groupId: 'Driver',
//   deduplicationId: chance.guid(),
// };

// try {
//   setTimeout( async () => {
//     await producer.send(payload);
//   }, 5000);
// } catch (error) {
//   console.error(error);
// }

app.on('error', (error) => {
  console.error(error.message);
});

app.on('processing_error', (error) => {
  console.error(error.message);
});

app.start();
