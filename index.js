const loadtest = require('loadtest');
let noramlPageUrl = 'http://vagrant.local/?p=25';
let pluginPageUrl = 'http://vagrant.local/?p=13&draftsforfriends=key_UnOHTTAm';
const options = {
    url: noramlPageUrl,
    maxRequests: 1000,
    concurrency: 10,
    timelimit: 10,
    requestsPerSecond: 40,
    agentKeepAlive: true,
    statusCallback
};

function statusCallback(error, result, latency) {
    console.log('Current latency %j, error %j', latency,  error);
    console.log('----');
    console.log('Request elapsed milliseconds: ', result.requestElapsed);
    console.log('Request index: ', result.requestIndex);
}

loadtest.loadTest(options, function(error, result)
{
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully: ', result);
});

