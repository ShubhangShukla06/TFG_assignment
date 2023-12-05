const amqp = require("amqplib");
const { subscriberEvent } = require("./subscriber");

exports.producerEvent = async (data) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queueName = "Register User";

    channel.assertQueue(queueName, {
      durable: true,
    });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

    setTimeout(() => {
      subscriberEvent();
      connection.close();
    }, 1500);
  } catch (error) {
    console.log(error.message);
  }
};
