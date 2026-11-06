//Error handling

async function fetchUser(userId) {
    const defaultUser = { id: 0, name: "Guest User", role: "visitor"};

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`User ${userId} not found (404). Returning default user.`);
                return defaultUser;
            }
            throw new Error(`HTTP error! Status : ${response.status}`);
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Network or fetch error encountered:", error.message);
        return defaultUser;
    }
}

async function runDay3() {
    const user = await fetchUser(99999);
    console.log("Resulting user object:", user);
}

runDay3();