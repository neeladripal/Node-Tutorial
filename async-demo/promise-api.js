const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async Operation 1...");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Operation 2...");
    reject(new Error("error on 2"));
  }, 2000);
});

// Parallel promises
// result will be available as an array
// if one gives error, the whole will fail
// Promise.all([p1, p2])
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// As soon as one promise is resolved/rejected, we get result
Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
