/**
 * New node file
 */

module.exports = function(app){
	
	var home = app.controllers.home;
	app.get('/', home.index);
	app.get('/sair', home.logout);
	
};


