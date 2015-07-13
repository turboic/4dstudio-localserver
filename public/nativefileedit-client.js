var NativeFileEdit = function(content, basename, callback){
	var url = 'edit/'
	url += '?basename='+encodeURI(basename);
	url += '&content='+encodeURI(content);
	// var url = 'edit/';

	var request = new XMLHttpRequest();
	request.addEventListener('load', function(){
		// 		console.log(JSON.parse(this.responseText));
		// console.dir(this)
		// debugger;
		// 

		var responseJSON = JSON.parse(this.responseText);
		if( responseJSON.status === 'ok' ){
			callback(null, responseJSON.newContent)				
		}else{
			callback(responseJSON.status, responseJSON.newContent)
		}
		// var response
		// callback(newContent)
	})
	// FIXME sync XMLHttpRequest
	request.open("get", url);
	request.send();		
}
