var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var app = express()

//set logger
app.use(logger('dev'))

//todos os app.use intercetam os pedidos. Estes dois primeiros fazem o next automaticamente através do bodyparser
//os outros têm de fazer next
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', function(req, res) {
    var d = new Date().toISOString().substr(0, 16)
    var files = jsonfile.readFileSync('dbFiles.json')
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write(templates.fileList(files, d))
    res.end()
})

app.get('/files/upload', function(req, res) {
    var d = new Date().toISOString().substr(0, 16)
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req, res) => {
    res.download(__dirname + '/public/filestore/' + req.params.fname)
})

//no caso de multiple files a funcao é upload.array()
//da origem a estrutura files que é um array no req
//processar varios ficheiros em vez de so 1
app.post('/files', upload.array('myFile'), function(req, res) {


    console.log(req)

    var c = 0;

    req.files.forEach(file => {
        let oldPath = __dirname + '/' + file.path
        let newPath = __dirname + '/public/filestore/' + file.originalname

        console.log("oldPath: " + oldPath)
        console.log("newPath: " + newPath)
        
        //move o ficheiro dos uploads para o filestore
        fs.rename(oldPath, newPath, function (err){
            if(err){
                throw err
            } 
        })

        var files = jsonfile.readFileSync('dbFiles.json')
        var d = new Date().toISOString().substr(0, 16)
        files.push(
            {
                date: d,
                name: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                desc: req.body.desc[c]
            }
        )
        jsonfile.writeFileSync('dbFiles.json', files)

        c++;
    })
    
    res.redirect('/')
    res.end()
})


app.listen(7700, () => console.log('Servidor à escuta na porta 7700...'))