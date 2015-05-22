/**
 * New node file
 */
module.exports = function(app){
	
	var HomeController = {
			index: function(req, res){
				res.render('home/index');
			},
		login: function(req,res){
			
			},
		logout: function(req,res){
			
			req.session.destroy();
			res.redirect('/');
		}
	};
	return HomeController;
};

