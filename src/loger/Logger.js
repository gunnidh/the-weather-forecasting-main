import  { AWS } from 'aws-sdk';

class CloudWatchLogger {
  constructor(logGroupName, logStreamName) {
    this.cloudwatchlogs = new AWS.CloudWatchLogs();
    this.logGroupName = logGroupName;
    this.logStreamName = logStreamName;
    this.initialized = false;
  }

  async initializeLogStream() {
    if (!this.initialized) {
        try {
            const params = {
              logGroupName: this.logGroupName,
              logStreamName: this.logStreamName
            };
      
            await this.cloudwatchlogs.createLogStream(params).promise();
            this.initialized = true;
          } catch (error) {
            console.error('Error initializing log stream:', error);
            throw error;
          }
    }
  }

  async log(message) {
    try {
      await this.initializeLogStream();

      const logParams = {
        logEvents: [
          {
            message: JSON.stringify(message),
            timestamp: Date.now()
          }
        ],
        logGroupName: this.logGroupName,
        logStreamName: this.logStreamName
      };

      await this.cloudwatchlogs.putLogEvents(logParams).promise();
    } catch (error) {
      console.error('Error logging to CloudWatch:', error);
      throw error;
    }
  }
}

// Expose CloudWatchLogger class for use anywhere
export default CloudWatchLogger;
