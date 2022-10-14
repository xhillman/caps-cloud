'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const {Chance} = require('chance');
const chance = new Chance();

const sns = new AWS.SNS();
const topic = 'arn:aws:sns:us-east-1:143451010179:Pickup.fifo';

let order = {
  OrderID: chance.guid(),
  Customer: chance.name(),
  VendorID: 'https://sqs.us-east-1.amazonaws.com/143451010179/flowersQueue',
};

let payload = {
  MessageDeduplicationId: chance.guid(),
  MessageGroupId: 'vendorGroup',
  Message: JSON.stringify(order),
  TopicArn: topic,
};

sns.publish(payload, (error, data) => {
  if(error){
    console.log(error);
  }
  console.log('MESSAGE -------- ', payload);
});
