/**
 * New node file
 */
module.exports = function(app) {
//	var autenticar = require('./../middlewares/autenticador');
	var chat = app.controllers.chat;
	app.post('/chat', chat.login);
};