const amqp = require("amqplib");
const fs = require("fs");

exports.subscriberEvent = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queueName = "Register User";

    channel.assertQueue(queueName, {
      durable: true,
    });
    channel.consume(queueName, (msg) => {
      fs.writeFile(
        "./src/rabbitmq/registerUserLog.txt",
        msg.content.toString(),
        { flag: "a+" },
        (err) => {
          if (err) console.log(err);
        }
      );
      channel.ack(msg);
    });
  } catch (error) {
    console.log(error.message);
  }
};
