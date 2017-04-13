const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        reject('Both values must be numbers.');
      }
      resolve(a + b);
    }, 1500);
  });
};

asyncAdd('5', 256).then((success) => { // asyncAdd returns a promise, giving us access to .then
  return asyncAdd(success, 33); // if the first call to asyncAdd succeeds, we call it again, returning another promise
}).then((res) => { // we have access to .then again, since we called asyncAdd
  console.log(res);
}).catch((error) => { // since we are chaining some promises together, we can use .catch to catch _any_ rejections, anywhere in the chain
  console.log(error);
});
