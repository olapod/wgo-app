// const {createLogger, format, transports} = require('winston');

// module.exports = createLogger({
//     format: format.combine(format.simple(),
//      format.timestamp(),
//      format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)),
//     transports: [
//         new transports.File({
//             maxsize: 5120000,//5MB Aprox
//             maxFiles: 5,
//             filename: `${__dirname}/../logs/log-api.log`
//         }),
//         new transports.Console({
//             level: 'debug'
//             //,format: format.combine(format.simple())
//         })
//     ]
// })

var winston = require("winston");
require('winston-socket.io');

module.exports = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.SocketIO(
      {
        host: "http://localhost",
        secure: true,
        reconnect: true,
        namespace: "log",
        log_topic: "log"
      }
    )
  ]
});


