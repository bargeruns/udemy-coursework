const getUser = (id, callback) => {
  let user = {
    id,
    name: 'Sean'
  };
  callback(user);
};

getUser(5, (user) => {
  console.log(user);
});
