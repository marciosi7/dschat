/**
 * New node file
 */

module.exports = function(app) {
	
	var ChatController = {
		
			login: function(req, res){
			
			var nickNames = {};
			
			var login = req.body.usuario.login;
			var nome = req.body.usuario.nome;
			var nickname = req.body.usuario.nickname;
		
			if(global.usuarios['usuario']){
				
				for(var i = 0; i < global.usuarios['usuario'].length; i++){
					
					if(login == global.usuarios['usuario'][i].login){
						
						global.nickNames = nickname;
						var params = {'login': global.usuarios['usuario'][i].login, 'nome' : global.usuarios['usuario'][i].nome };
						
						res.render('chat/index', params);
					}
					
				}
				
			}
			
			if(login && nome){
				
				var pg = require('pg');
				var conString = "pg://postgres:admin@localhost:5432/DIGITE_SAUDE";
				var results = [];
				
				pg.connect(conString, function(err, client, done) {

					  var queryString = "select l.LOGIN, p.nome from tb_login as l ";
					  	  queryString = queryString + "inner join tb_usuario as u on u.id_login = l.id_login " ;
					  	  queryString = queryString + "inner join tb_usuario_site as us on us.id_usuario = u.id_usuario " ;
					      queryString = queryString + "inner join tb_pessoa as p on p.id_pessoa = us.id_pessoa " ;
					      queryString = queryString + "where l.LOGIN = ($1) " ;
				
					  var query = client.query(queryString, [login]);
					  
					  if (err) {
					      return console.error('error running query', err);
					    }

				        // Stream results back one row at a time
				        query.on('row', function(row) {
				            results.push(row);
				        
				        });
					
					    query.on('end', function() {
					    	client.end();
					    	var usuario = results;
					    	global.usuarios['usuario'] = usuario;
							var params = {'login': results[0].login, 'nome' : results[0].nome };
							res.render('chat/index', params);
				        });
					    
					    if (err) {
						    return console.error('error fetching client from pool', err);
						  }
						  
					  });

			}
			else{
				res.redirect('/');
			}
		
		}
 };
	return ChatController;
};