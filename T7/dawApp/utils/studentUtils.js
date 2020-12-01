function tpcString(tpc){
	done = 0
	total = 0
	tpc.forEach(t =>{
		if(t == '1'){
			done += 1
		}
		total += 1
    })
	return done.toString() + "/" + total.toString() 
}

exports.tpcString = tpcString


function parseTpc(body){
	cboxes = []
	tpc = new Array(8).fill(0)
	for(prop in body){
		if(prop[0] == 'H'){
			cboxes.push(prop[prop.length - 1])	
		}
	}
	for(let i = 0; i < cboxes.length; i++){
		tpc[cboxes[i] - 1] = 1
	}
	std = {}
	std.numero =body.numero
	std.nome = body.nome
	std.git = body.git
	std.tpc = tpc

	return std
}

exports.parseTpc = parseTpc