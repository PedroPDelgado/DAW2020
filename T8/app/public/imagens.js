function showImage(name, type){
    if(type == 'image/png' || type == 'image/jpeg')
        var ficheiro = '<img src="/filestore/' + name + '" width="80%"/>'
    else
        var ficheiro = $('<p>' + name + ', ' + type + '</p>')
        
    var fileObj = $(`
        <div class="w3-row w3-margin-bottom">
            <div class="w3-col s6">
                ${ficheiro}
            </div>

            <div class="w3-col s6 w3-border">
               <p>Filename: ${name}</p>
               <p>MimeType: ${type}</p>
            </div>
        </div>
    `)
    var download = $('<div><a href="files/download/' + name + '">Download</a></div>')
    $("#display").empty() //limpar a imagem/s anterior que possa ter sido aberta
    $("#display").append(fileObj, download)
    $("#display").modal() //tornar o modal visivel
}

function myFunction(){
    const div = document.createElement('div');
    div.className = 'w3-row w3-margin-bottom';

    div.innerHTML = `<div class="w3-row w3-margin-bottom">
    <div class="w3-col s3">
        <label class="w3-text-teal">Description</label>
    </div>

    <div class="w3-col s9 w3-border">    
        <input class="w3-input w3-border w3-light-grey" type="text" name="desc">
    </div>
</div>

<div class="w3-row w3-margin-bottom">
    <div class="w3-col s3">
        <label class="w3-text-teal">Select file</label>
    </div>

    <div class="w3-col s9 w3-border">    
        <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
    </div>
</div>`

    document.getElementById('add').before(div);

}
