// rewrite using async/await

function simulatedFetchProfile(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({id: userId, username: "webDevStudent", tier: "pro"});
            } else {
                reject(new Error("Invalid user ID provided."));
            }
        }, 1000);
    });
}

async function runDay4(userId) {
    try {
        console.log("Fetching user profile asynchronously...");
        const profile = await simulatedFetchProfile(userId);
        console.log("success! Profile data:", profile);
    } catch (error) {
        console.error("Failed to load profile:", error.message);
    }
}

runDay4();