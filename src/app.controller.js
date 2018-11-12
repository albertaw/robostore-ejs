const axios = require('axios');
const host = 'http://robostore-api.us-east-1.elasticbeanstalk.com';

module.exports = {
	getUsers,
	getUser,
	getItems,
	getItem,
	getError
}

function getUsers(req, res, next) {
  const path =  host + '/api/users';
  axios.get(path)
  .then(function(users) {
    res.render('pages/index', {users: users.data});
  })
  .catch(function (error) {
    res.render('pages/error', {message: error});
  });
}

function getUser(req, res, next) {
  const userPath = host + '/api/users/' + req.params.userId;
  const itemPath = host +'/api/users/' + req.params.userId + '/inventoryItems';
  
  axios.all([
    axios.get(userPath),
    axios.get(itemPath)
  ])
  .then(axios.spread((user, items) => {
    res.render('pages/user-detail', {user: user.data, items: items.data});
  }))
  .catch(function (error) {
    res.render('pages/error', {message: error});
  });
}

function getItems(req, res, next) {
  const path = host + '/api/items';
  
  axios.get(path)
  .then(function(items) {
    res.render('pages/item-list', {items: items.data});
  })
  .catch(function (error) {
    res.render('pages/error', {message: error});
  });
}

function getItem(req, res, next) {
  const itemPath = host + '/api/items/' + req.params.itemId;
  const sellersPath = host + '/api/items/' + req.params.itemId + '/users';
  
  function handleClick(e) {
    console.log('item clicked');
  }
  axios.all([
    axios.get(itemPath),
    axios.get(sellersPath)
  ])
  .then(axios.spread((item, sellers) => {
    res.render('pages/item-detail', {item: item.data, users: sellers.data, clickHandler: 'addToCart()' });
  }))
  .catch(function (error) {
    res.render('pages/error', {message: error});
  });
}


function getError(req, res, next) {
	res.render('pages/error', {message: 'Page not found'});
}