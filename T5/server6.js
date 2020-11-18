var http = require('http')
var axios = require('axios')

http.createServer(function (req, res){
	console.log(req.method + ' ' + req.url)
	if(req.method == 'GET'){
		if(req.url == '/'){
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
			res.write('<h2>Escola de Música</h2>')
			res.write('<ul>')
			res.write('<li><a href="/alunos">Lista de alunos</a></li>')
			res.write('<li><a href="/cursos">Lista de cursos</a></li>')
			res.write('<li><a href="/instrumentos">Lista de instrumentos</a></li>')
			res.write('</ul>')
			res.end()
		}else if (req.url == '/alunos'){
			axios.get('http://localhost:3001/alunos')
			.then(function(resp) {
				alunos = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
				res.write('<h2>Escola de Música: Lista de alunos</h2>')
				res.write('<ul>')

				alunos.forEach(a => {
					res.write('<li><a href="/alunos/' + a.id + '">' + a.id + ' - ' + a.nome + '</a></li>')	
				});


				res.write('</ul>')
				res.write('<adress>[<a href="/">Voltar</a>]</adress>')
				res.end()

			}).catch(function(error) {
				console.log("Erro na obtencao da lista de alunos: " + error);
			});
		}else if (req.url == '/cursos'){
			axios.get('http://localhost:3001/cursos')
			.then(function(resp) {
				cursos = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
				res.write('<h2>Escola de Música: Lista de cursos</h2>')
				res.write('<ul>')

				cursos.forEach(c => {
					res.write('<li><a href="/cursos/' + c.id + '">' + c.id + ' - ' + c.designacao + '</a></li>')	
				});

				res.write('</ul>')
				res.write('<adress>[<a href="/">Voltar</a>]</adress>')
				res.end()

			}).catch(function(error) {
				console.log("Erro na obtencao da lista de cursos: " + error);
			});
		}else if (req.url == '/instrumentos'){
			axios.get('http://localhost:3001/instrumentos')
			.then(function(resp) {
				instrumentos = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
				res.write('<h2>Escola de Música: Lista de instrumentos</h2>')
				res.write('<ul>')

				instrumentos.forEach(i => {
					res.write('<li><a href="/instrumentos/' + i.id + '">' + i.id + ' - ' + i['#text'] + '</a></li>')	
				});

				res.write('</ul>')
				res.write('<adress>[<a href="/">Voltar</a>]</adress>')
				res.end()

			}).catch(function(error) {
				console.log("Erro na obtencao da lista de instrumentos: " + error);
			});
		}else if (req.url.match('\/alunos\/A(E-)?[0-9]+')){
			id = req.url.split("/")[req.url.split("/").length - 1]
			axios.get('http://localhost:3001/alunos/' + id)
			.then(function(resp) {
				aluno = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
				res.write('<h2>Aluno - ' + aluno.id + '</h2>')
				res.write('<table width="50%" border="0">')
				res.write('<tbody>')
				res.write('<tr><td width="50%"><b>Nome: </b>' + aluno.nome + '</td>')
				res.write('<tr><td width="50%"><b>Data de nascimento: </b>' + aluno.dataNasc + '</td>')
				res.write('<tr><td width="50%"><b>Curso: </b><a href="/cursos/' + aluno.curso + '">' + aluno.curso +'</a></td>')
				res.write('<tr><td width="50%"><b>Ano do curso: </b>' + aluno.anoCurso + '</td>')
				res.write('</tr>')
				res.write('</tbody>')
				res.write('</table>')
				res.write('<br/>')
				res.write('<adress>[<a href="/">Voltar - Home</a>]</adress>')
				res.end()

			}).catch(function(error) {
				console.log("Erro na obtencao da página do aluno" + aluno.id + ": " + error);
			});
		}else if (req.url.match('\/cursos\/[A-Z]{2}[0-9]+')){
			id = req.url.split("/")[req.url.split("/").length - 1]
			axios.get('http://localhost:3001/cursos/' + id)
			.then(function(resp) {
				curso = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
				res.write('<h2>Curso - ' + curso.id + '</h2>')
				res.write('<table width="50%" border="0">')
				res.write('<tbody>')
				res.write('<tr><td width="50%"><b>Designação: </b>' + curso.designacao + '</td>')
				res.write('<tr><td width="50%"><b>Duração: </b>' + curso.duracao + ' anos</td>')
				res.write('<tr><td width="50%"><b>Instrumento: </b><a href="/instrumentos/' + curso.instrumento.id + '">' + curso.instrumento['#text'] + '</a></td>')
				res.write('</tr>')
				res.write('</tbody>')
				res.write('</table>')
				res.write('<br/>')
				res.write('<adress>[<a href="/">Voltar - Home</a>]</adress>')
				res.end()

			}).catch(function(error) {
				console.log("Erro na obtencao da página do curso" + curso.id + ": " + error);
			});
		}else if (req.url.match('\/instrumentos\/I[0-9]+')){
			id = req.url.split("/")[req.url.split("/").length - 1]
			axios.get('http://localhost:3001/instrumentos/' + id)
			.then(function(resp) {
				instrumento = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
				res.write('<h2>Instrumento - ' + instrumento.id + '</h2>')
				res.write('<table width="50%" border="0">')
				res.write('<tbody>')
				res.write('<tr><td width="50%"><b>Nome: </b>' + instrumento['#text'] + '</td>')
				res.write('</tr>')
				res.write('</tbody>')
				res.write('</table>')
				res.write('<br/>')
				res.write('<adress>[<a href="/">Voltar - Home</a>]</adress>')
				res.end()

			}).catch(function(error) {
				console.log("Erro na obtencao da página do instrumento" + instrumento.id + ": " + error);
			});
		}else{
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
			res.write("<p>Pedido não suportado: " + req.method + " " + req.url + ".</p>")
			res.end()
		}
	}else{
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
		res.write("<p>Pedido não suportado: " + req.method + " " + req.url + ".</p>")
		res.end()
	}
	
}).listen(4000);

console.log('Servidor á escuta na porta 4000')
