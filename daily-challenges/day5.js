//parallel fetches

async function runDay5() {
    const endpoints = [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2',
        'https://jsonplaceholder.typicode.com/todos/3'
    ];
    console.log("Starting parallel fetches with promise.allSettled...");

    const fetchPromises = endpoints.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        return await response.json();
    });

    const results = await Promise.allSettled(fetchPromises);

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Endpoint ${index + 1} succeeded:`, result.value);
        } else {
            console.error(`Endpoint ${index + 1} failed:`, result.reason.message);
        }
    });
    
}

runDay5();