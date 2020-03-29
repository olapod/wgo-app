const winston = require('winston');
require('winston-socket.io');

const logger = winston.createLogger({
    level: "info",
    transports: [
        // new winston.transports.Console(),
        new winston.transports.SocketIO(
            {
                host: "http://localhost",
                port: 5000,
                secure: false,
                reconnect: true,
                log_topic: "log"
            }
        )
    ]
});
module.exports = logger;


