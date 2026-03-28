require('dotenv').config();

const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

if (connectionString) {
  const { useAzureMonitor } = require('@azure/monitor-opentelemetry');

  useAzureMonitor({
    azureMonitorExporterOptions: {
      connectionString
    }
  });

  console.log('Azure Monitor telemetry enabled.');
} else {
  console.log('Application Insights connection string not found. Telemetry disabled.');
}
