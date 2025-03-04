const { Kafka } = require("kafkajs");

exports.run = async (payment, producer) => {
  await producer.connect();
  const topic = "payments-notifications";

  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(payment) }],
  });

  console.log("Message additing of queue.");
  await producer.disconnect();
};
