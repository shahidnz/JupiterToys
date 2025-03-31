import { createLogger, format, transports } from 'winston';
import path from 'path';

const logFile: string = 'logs/new_test.log';

// Custom format to include file name and line number
const addCallerInfo = format((info) => {
    const error = new Error();
    const stackLines = error.stack?.split('\n');
    if (stackLines) {
      // Skip the first 3-4 lines to reach application code (adjust based on stack depth)
      // 0: Error, 1: this function, 2-3: winston internals, 4+: app code
      for (let i = 4; i < stackLines.length; i++) {
        const stack = stackLines[i];
        const match = stack.match(/at .+ \((.+):(\d+):(\d+)\)/) || stack.match(/at (.+):(\d+):(\d+)/);
        if (match) {
          const filePath = match[1];
          // Exclude node_modules paths
          if (!filePath.includes('node_modules')) {
            const fileName = path.basename(filePath);
            const line = match[2];
            info.caller = `${fileName}:${line}`;
            break;
          }
        }
      }
    }
    if (!info.caller) {
        info.caller = 'unknown:0';
      }
    return info;
  });

const logger = createLogger({
  // Default level; can be overridden with DEBUG=true env var
  level: 'info', 
  format: format.combine(
    addCallerInfo(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, caller }) => {
      return `${timestamp} [${level.toUpperCase()}](${caller}):: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: logFile }) // Log to file
  ]
});

// Enable debug logging if DEBUG=true in environment
if (process.env.DEBUG === 'true') {
  logger.level = 'debug';
}
logger.level = 'debug';
export default logger;