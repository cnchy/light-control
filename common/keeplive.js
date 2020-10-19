var delay = function(callback,cansend,b){
    if(cansend){
		callback(b)
		cansend=true
	}
	else{setTimeout(function(){delay(callback,strId)}, 30)}
}

