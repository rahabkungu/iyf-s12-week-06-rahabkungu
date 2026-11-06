//callbacks -> promise + chaining -> Async/await
//part A

const nameFor = (id) => ({ 1: "Amina", 2: "Brian"}[id] || "Unknown");

function getUserCb(userId, cb) {
    setTimeout(() => {
        if (!userId) return cb(new Error("Missing userId"));
        cb(null, { id: userId, name: nameFor(userId) });
    }, 400);
}

function getOrdersCb(user, cb) {
    setTimeout(() => {
        cb(null, [
        { id: 101, amount: 20},
        { id: 102, amount: 35},
    ])    
    }, 400);
}

function getOrderTotalCb(orders, cb) {
    setTimeout(() => {
        const total = orders.reduce((sum, o) => sum + o.amount, 0);
        cb(null, total);
    }, 400);
}

//caller - callback version 
getUserCb(1, (err, user) => {
    if (err) return console.error("A error:", err.message);
    getOrdersCb(user, (err, orders) => {
        if (err) return console.error("A error:", err.message);
        getOrderTotalCb(orders, (err, total) => {
            if (err) return console.error("A error:", err.message);
            console.log(`A: ${user.name} spent ${total}`);
        });
    });
});

//part B
//Todo B1

function getUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!userId) return reject(new Error("Missing userId"));
            resolve({ id: userId, name: nameFor(userId) });
        }, 400);
    });
}


function getOrders(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //(option error check can go here if needed)
            resolve([
                { id: 101, amount: 20},
                { id: 102, amount: 35},
            ]);
        }, 400);
    });
}

function getOrderTotal(orders) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const total = orders.reduce((sum, o) => sum + o.amount, 0);
            resolve(total);
        }, 400);
    });
}

//Todo B2

let savedUser;

getUser(1)
  .then((user) => {
    savedUser = user;
    return getOrders(user)
  })
  .then((orders) => {
    return getOrderTotal(orders);
  })
  .then((total) => {
    console.log(`B: ${savedUser.name} spent ${total}`);
  })
  .catch((err) => console.error("B error:", err.message));

  //part C
  //Todo C1

  async function checkout(userId) {
    try {
        const user = await getUser(userId);
        const orders = await getOrders(user);
        const total = await getOrderTotal(orders);

        console.log(`C: ${user.name} spent ${total}`);
    } catch (err) {
        console.error("C eror:", err.message);
    }
  }

//Todo  C2

checkout(1);

async function runBonus() {
    try {
        const [user1, user2] = await Promise.all([getUser(1), getUser(2)]);
        console.log(`Bonus: Users fetched in parallel -> ${user1.name} and ${user2.name}`);
    } catch (err) {
        console.error("Bonus error:", err.message);
    }
}

runBonus();
