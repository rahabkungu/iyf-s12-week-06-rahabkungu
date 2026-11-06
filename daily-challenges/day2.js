//Promise chain

function stepOne() {
    const delayTime = Math.floor(Math.random() * 1000) + 500; //500ms -1500ms
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`step 1 completed in ${delayTime}ms`);
            resolve("Data from step 1");
        }, delayTime);
    });
}

function stepTwo(previousData) {
    const delayTime = Math.floor(Math.random() * 1000) + 500;
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`step 2 completed in ${delayTime}ms using [${previousData}]`);
            resolve("Data from step 2");
        }, delayTime);
    });
}

function stepThree(previousData) {
    const delayTime = Math.floor(Math.random() * 1000) + 500;
    return new Promise((resolve) => {
        console.log(`step 3 completed in ${delayTime}ms using[${previousData}]`);
        resolve("All steps successfully completed!");
    }, delayTime);
}

async function runDay2() {
    console.time("Total execution time");
    try {
        const result1 = await stepOne();
        const result2 = await stepTwo(result1);
        const result3 = await stepThree(result2);
        console.log(result3);
    } catch (error) {
        console.error("An error occurred during the promise chain:", error);
    }
    console.timeEnd("Total execution time");
}

runDay2();