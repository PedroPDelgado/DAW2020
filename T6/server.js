var http = require('http')
var axios = require('axios')
var fs = require('fs')
var {parse} = require('querystring')
var static = require('./static') 


// Funcoes auxiliares

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

function geraConfirm( tarefa, d){
    let pagHTML = `
    <html>
    <head>
        <title>Receipt: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="aluno.png"/>
        <link rel="stylesheet" href="./w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa registada</h1>
            </header>

            <div class="w3-container">
                <p><a href="/tarefas/${tarefa.id}">Aceda à tarefa.</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por tarefas::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

function geraConfirmDelete( d ){
    let pagHTML = `
    <html>
        <head>
            <title>Lista de tarefas</title>
            <link rel="stylesheet" href="./w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Tarefa Eliminada</h2>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por tarefas::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}


// Template para a página da tarefa -------------------------------------
function geraPagTarefa( tarefa, d ){
    return `
    <html>
    <head>
        <title>Tarefa: ${tarefa.nome}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="aluno.png"/>
        <link rel="stylesheet" href="./w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa \"${tarefa.nome}\"</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Estado: </b> ${tarefa.estado}</li>
                    <li><b>Data de término: </b> ${tarefa.data}</li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por tarefas::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}


// Template para a página das tarefas
function geraPagTarefas(tarefas_c, tarefas_p, d){
  let pagHTML = `
    <html>
        <head>
            <title>Lista de tarefas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href=".aluno.png"/>
            <link rel="stylesheet" href="./w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Lista de tarefas</h2>
            </div>

            <div style="float: left; width: 45%">
            <table class="w3-table w3-bordered">
                <th style="font-size: 25px">Tarefas pendentes</th>
                <tr>
                    <th>Nome</th>
                    <th>Estado</th>
                    <th>Data de término</th>
                </tr>
  `
  /* ----------------------------------------------------
     To be replaced with code to generate the table rows
     ---------------------------------------------------- */
     tarefas_p.forEach(t => {
        pagHTML += `
        <tr>
            <td><a href="/tarefas/${t.id}">${t.nome}</a></td>
            <td>${t.estado}</td>
            <td>${t.data}</td>
            <td><form action="/tarefas/${t.id}/edit">
                    <input type="submit" value="Editar" />
                </form>
            </td>
            <td><form action="/tarefas/${t.id}/delete">
                    <input type="submit" value="Eliminar" />
                </form>
            </td>
        </tr>
        `
     });

  pagHTML += `
        <tr>
            <td><form action="/tarefas/registo">
                    <input type="submit" value=" + " />
                </form>
            </td>
        </tr>
        </table>
        </div>


        <div style="float: left; padding-left: 100px; width: 55%">
            <table class="w3-table w3-bordered">
                <th style="font-size: 25px">Tarefas concluídas</th>
                <tr>
                    <th>Nome</th>
                    <th>Estado</th>
                    <th>Data de término</th>
                </tr>
  `
  /* ----------------------------------------------------
     To be replaced with code to generate the table rows
     ---------------------------------------------------- */
     tarefas_c.forEach(t => {
        pagHTML += `
        <tr>
            <td><a href="/tarefas/${t.id}">${t.nome}</a></td>
            <td>${t.estado}</td>
            <td>${t.data}</td>
            <td><form action="/tarefas/${t.id}/edit">
                    <input type="submit" value="Editar" />
                </form>
            </td>
            <td><form action="/tarefas/${t.id}/delete">
                    <input type="submit" value="Eliminar" />
                </form>
            </td>
        </tr>
        `
     });

  pagHTML += `
        </table>
        </div>
        <br clear="all" />
        <div class="w3-container w3-teal">
            Gerado por tarefas::DAW2020 em ${d}
        </div>
    </body>
    </html>
  `
  return pagHTML
}



// Template para o formulário da tarefa ------------------
function geraFormTarefa( id, d ){
    return `
    <html>
        <head>
            <title>Registo de tarefa</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="./w3.css">
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Registo de Tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas" method="POST">

                <label class="w3-text-teal"><b>Id</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id" value="${id}" readonly>

                <label class="w3-text-teal"><b>Nome</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="nome">

                <label class="w3-text-teal"><b>Estado</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="estado" value="Pendente" readonly>
          
                <label class="w3-text-teal"><b>Data de término</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="data">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por tarefas::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </body>
    </html>
    `
}

// Formulário para alterar dados da tarefa

function geraFormEdicaoTarefa(tarefa, d){
    //nota, neste html, mais a baixo, esta a ser usado method="POST" agora, no tpc, intercetar este POST e enviar PUT para o localhost:3000
    return `
    <html>
        <head>
            <title>Edição de tarefa: ${tarefa.id}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="./w3.css">
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Edição de tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas/edit" method="POST">

                <label class="w3-text-teal"><b>Id</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id" value="${tarefa.id}" readonly>

                <label class="w3-text-teal"><b>Nome</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="nome" value="${tarefa.nome}">

                <label class="w3-text-teal"><b>Estado</b></label>
                <select class="w3-select w3-border w3-light-grey" name="estado" id="estado">
                  <option value="Pendente">Pendente</option>
                  <option value="Concluído">Concluído</option>
                </select>
          
                <label class="w3-text-teal"><b>Data de término</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="data" value="${tarefa.data}">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Submeter alterações"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Repor valores originais"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por tarefas::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </body>
    </html>
    `
}

// função que calcula próximo id disponível para uma tarefa
function getNextAvailableId(tarefas){
    var ids = []
    console.log(tarefas)
    tarefas.forEach(t =>{
        ids.push(parseInt(t.id.slice(1)))
    })
    ids = ids.sort();

    for (let i = 0; i < ids.length; i++) {
        if(ids[i] > i){
            return "T" + i
        }
    }
    console.log("here")
    return "T" + ids.length

}




// Criacao do servidor

var tarefasServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }else{


    switch(req.method){
        case "GET": 
            // GET /tarefas --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tarefas")){
                axios.get("http://localhost:3000/tarefas?_sort=nome")
                    .then(response => {
                        var tarefas = response.data
                        var tarefas_concluidas = []
                        var tarefas_pendentes = []
                        tarefas.forEach(t => {
                            if(t.estado == "Concluído"){
                                tarefas_concluidas.push(t)
                            }else{
                                tarefas_pendentes.push(t)
                            }
                        })

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagTarefas(tarefas_concluidas, tarefas_pendentes, d))
                        res.end()

                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                        res.end()
                    })
            }
            // GET /tarefas/:id --------------------------------------------------------------------
            else if(/\/tarefas\/T[0-9]+$/.test(req.url)){
                var idTarefa = req.url.split("/")[2]
                axios.get("http://localhost:3000/tarefas/" + idTarefa)
                    .then( response => {
                        let t = response.data
                        
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagTarefa(t, d))
                        res.end()

                    }).catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a página da tarefa...</p>")
                        res.end()
                    })
            }
            // GET /alunos/registo --------------------------------------------------------------------
            else if(req.url == "/tarefas/registo"){

                axios.get("http://localhost:3000/tarefas")
                    .then( response => {
                        let tarefas = response.data
                        console.log(tarefas)
                        
                        available_id = getNextAvailableId(tarefas)

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraFormTarefa(available_id, d))
                        res.end()

                    }).catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Erro ao registar tarefa...</p>")
                        res.end()
                    })

            }
            // GET /tarefas/:id/edit --------------------------------------------------------------------
            else if(/\/tarefas\/T[0-9]+\/edit/.test(req.url)){
                var idTarefa = req.url.split("/")[2]

                axios.get("http://localhost:3000/tarefas/" + idTarefa)
                    .then( response => {
                        let t = response.data
                        
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraFormEdicaoTarefa(t, d))
                        res.end()

                    }).catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a página de edição da tarefa</p>")
                        res.end()
                    })
            }
            // GET /tarefas/:id/delete --------------------------------------------------------------------
            else if(/\/tarefas\/T[0-9]+\/delete/.test(req.url)){
                var idTarefa = req.url.split("/")[2]

                axios.delete("http://localhost:3000/tarefas/" + idTarefa)
                    .then( response => {
                        
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraConfirmDelete(d))
                        res.end()

                    }).catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível eliminar a tarefa</p>")
                        res.end()
                    })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url == '/tarefas'){
                    recuperaInfo(req, resultado => {
                        console.log('POST de tarefa:' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/tarefas', resultado)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraConfirm( resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                })
            }else if(req.url == '/tarefas/edit'){
                recuperaInfo(req, resultado => {
                        console.log('PUT de tarefa:' + JSON.stringify(resultado))
                        axios.put('http://localhost:3000/tarefas/' + resultado.id, resultado)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraConfirm( resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                })
            }
            
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
}
})

tarefasServer.listen(7778)
console.log('Servidor à escuta na porta 7778...')