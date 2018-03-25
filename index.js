const loadtest = require('loadtest');
// CLI spinner
const ora = require('ora');

// FIXME move these to a git ignored settings file
let noramlPageUrl = 'http://vagrant.local/?p=25';
let pluginPageUrl = 'http://vagrant.local/?p=13&draftsforfriends=key_UnOHTTAm';

// start the spinner right away
const spinner = ora('Load testing').start();

// reports back on each request during load testing
const statusCallback = (error, result, latency) => {
  spinner.text = getReportText(latency, options, error);
};

// load testing options, see loadtest package on npm to make sense of them
const options = {
  url: pluginPageUrl,
  maxRequests: 1000,
  concurrency: 20,
  timelimit: 20,
  requestsPerSecond: 30,
  agentKeepAlive: true,
  statusCallback,
};

// formats text for the spinner
const getReportText = (latency, options, error) => {
  const {
    totalRequests,
    totalErrors,
    rps,
    minLatencyMs,
    meanLatencyMs,
    maxLatencyMs,
    percentiles,
    errorCodes,
  } = latency;

  return `load testing
      URL: ${options.url}...
      Total Requests: ${totalRequests}
      Total Errors: ${totalErrors} times, ${Math.floor((totalErrors / totalRequests) * 100)}%
      Mean Latency (ms): ${parseInt(meanLatencyMs, 10)}
      Maximum Latency: ${parseInt(maxLatencyMs, 10)}
      Min Latency: ${parseInt(minLatencyMs, 10)}
      Requests per Second: ${parseInt(rps, 10)}
      Percentiles: ${JSON.stringify(percentiles)}
      Error Codes: ${errorCodes ? JSON.stringify(errorCodes) : 'none'}
`;
};


//
loadtest.loadTest(options, function(error, result) {
  if (error) {
    return console.failed(`Got an error ${error}`);
  }
  spinner.succeed(`Done with ${getReportText(result, options, error)}`);
});
