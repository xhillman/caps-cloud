# CAPS in the Cloud

Using only AWS Services: SQS, SNS, Lambda, create a cloud version of the CAPS system.

## Author: Xavier Hillman

### Setup

`npm i sqs-consumer sqs-producer chance`

### Features

**Vendors:**

- Vendors will post “pickup” messages containing delivery information into the SNS pickup topic
  - `{ orderId: 1234, customer: "Jane Doe", vendorId: queueArn}`
  - Note the `queueArn` – this refers to the AWS ‘arn’ of the vendor’s specific delivered queue
- Pickup requests should be moved into a FIFO queue called packages for the drivers automatically
  - (Make the packages queue a subscriber to the pickup topic)
- Vendors should separately subscribe to their personal SQS queue and periodically poll the queue to see delivery notifications

**Drivers:**

- Drivers will poll the SQS packages queue and retrieve only the next delivery order (message)
- After a time (e.g. 5 seconds), drivers will post a message to the Vendor specific SQS Queue using the queueArn specified in the order object

### UML

![Lab 19 UML](/src/assets/Lab%2019%20UML.jpg)

#### Acme Terminal After Sending a Message

![Acme Terminal](/src/assets/acmevendor.jpeg)

#### Flowers Terminal After Sending a Message

![Flowers Terminal](/src/assets/flowersvendor.jpeg)

#### Driver Terminal After Receiving Messages

![Driver Terminal](/src/assets/driverclient.jpeg)
