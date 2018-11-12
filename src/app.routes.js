const express = require('express');
const router = express.Router();
const routes = require('./app.controller');

module.exports = router

router.get('/', routes.getUsers);
router.get('/users/:userId', routes.getUser);
router.get('/items', routes.getItems);
router.get('/items/:itemId', routes.getItem);
router.get('*', routes.getError);
