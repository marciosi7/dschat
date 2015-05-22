var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/public'));
var usuarios = {};
var logins = {};

server.listen(3000,function(){
	console.log("Digite Saude no ar");
});


app.get('/', function(req, resp){
	
    resp.sendfile(__dirname + '/views/index.html');
});

io.sockets.on("connection", function(socket){
	
	socket.on('novo usuario', function(login, callback){
        if(login in logins){
            callback({retorno : false, msg : "Usuairo já em uso! Escolha outro!"});
        } else {
            var pg = require('pg');
			var conString = "pg://postgres:admin@localhost:5432/DIGITE_SAUDE";
			var results = [];
			
			pg.connect(conString, function(err, client, done) {

				  var queryString = "select l.LOGIN from tb_login as l ";
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
				    	
				    	if(results[0] == undefined){
				    		 callback({retorno : false, msg : "Nao existe esse login!"});
				    	}
				    	else{
				    		callback({retorno : true, msg : ""});
				    		 socket.login = results[0].login;
					         logins[socket.login] = socket;
				    	}
				    						
			        });
				    
				    if (err) {
					    return console.error('error fetching client from pool', err);
					  }
					  
				  });
        }
    });
	
    socket.on('novo nickName', function(nickname, callback){
        if(nickname in usuarios){
            callback({retorno : false, msg : "Nickname em uso! Escolha outro!"});
        } else {
            
            callback({retorno : true, msg : ""});
            socket.nickname = nickname;
            usuarios[socket.nickname] = socket;
            atualizarUsuarios();
        }
    });
    
    
    socket.on('enviar mensagem', function(data){
        var mensagem = data.trim();
        
        var letra = mensagem.substring(0,1);
        
        if(letra=== "/"){
            // mensagem privada
            var nome = mensagem.substr(1, mensagem.indexOf(" ")).trim();
            var msg = mensagem.substr(mensagem.indexOf(" ")+1);
            
            if(nome in usuarios){
                usuarios[nome].emit('nova mensagem', {msg : "(mensagem privada de "+socket.nickname+"): <i>"+msg+"</i> ", nick : usuarios[nome].nickname});
                
                socket.emit('nova mensagem', {msg : "(você enviou para "+nome+") <i>"+mensagem+"</i>", nick : usuarios[nome].nickname});
            } else {
                socket.emit('nova mensagem', {msg : "O usuário "+nome+" não foi encontrado", nick : socket.nickname});
            }
            
        } else {
            io.sockets.emit('nova mensagem', {msg : mensagem, nick : socket.nickname});
        }
        
    });
    
    socket.on("disconnect", function(){
        if(!socket.nickname) return;
        delete usuarios[socket.nickname];
        delete logins[socket.login];
        atualizarUsuarios();
    });
    
    function atualizarUsuarios(){
        io.sockets.emit('atualiza usuarios', Object.keys(usuarios));
    }
});