
var broker = 'amqp://' + process.argv[2];

console.log("Connecting to " + broker);

var open = require('amqplib').connect(broker);
var recvCount = 0, sendCount = 0, recvTotal = 0, sendTotal = 0;
var chanCount= 0;
var chanMax = 8;

function channel(conn) {
  var ok = conn.createChannel();
  var chanNum = chanCount++;
  ok = ok.then(function(ch) {
    ch.consume('amq.rabbitmq.reply-to', function(msg) {
      if (msg !== null) {
        recvCount++;
      }
    }, {'noAck': true});
    return ch;
  }).then(function(ch) {
    setInterval(function() {
    	ch.publish('spring-sprong-requests', 'chan'+chanNum, new Buffer('{}'), {'replyTo': 'amq.rabbitmq.reply-to'});
	sendCount++;
    }, 1);
  });
  return ok;
}

// Consumer
open.then(function(conn) {
 
  for (var i=0; i < chanMax; i++)
    channel(conn);
 
  setInterval(function() {
    recvTotal += recvCount; 
    sendTotal += sendCount;
    console.log("Rate: send " + sendCount + ", recv " + recvCount + " msg/sec. Total: send " + sendTotal + ", recv " + recvTotal + " msgs. Outstanding: " + (sendTotal - recvTotal) + " msgs.");
    recvCount = 0;
    sendCount = 0;
  }, 1000);

}).then(null, console.warn);
