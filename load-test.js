// Import HTTP module to make HTTP requests
const http = require('http');

// Define options for request
const options = {
  hostname: 'localhost', 
  port: 5000, 
  path: '/api/login', 
  method: 'POST', 
  // Indicate payload is in JSON format
  headers: {
    'Content-Type': 'application/json' 
  }
};

// Initialise counters 
let totalRequests = 0, successCount = 0, failureCount = 0;

// Create HTTP request and get response status code 
const makeRequest = () => {
  const req = http.request(options, (res) => {
    const statusCode = res.statusCode;
    console.log(`Status Code: ${statusCode}`);

    // Increment counters based on the status code
    if (statusCode === 200) {
      successCount++;
    } else {
      failureCount++;
    }
    totalRequests++;

    // Log a message when response is complete
    res.on('end', () => console.log('No more data in response.'));
  });

  // Error handling
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    failureCount++;
    totalRequests++;
  });

  // Write payload to request body
  req.write(JSON.stringify({ username: 'hello', password: 'hello' }));
  req.end();
};

// Define number of concurrent requests
const concurrentRequests = 1000;

// Loop requests
for (let i = 0; i < concurrentRequests; i++) {
  makeRequest();
}

// Log counters and rates 
setInterval(() => {
  console.log(`Total Requests: ${totalRequests}`);
  console.log(`Successful Requests: ${successCount}`);
  console.log(`Failed Requests: ${failureCount}`);
  console.log(`Success Rate: ${(successCount / totalRequests) * 100}%`);
  console.log(`Failure Rate: ${(failureCount / totalRequests) * 100}%`);
}, 1000);