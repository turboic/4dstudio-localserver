var NativeFileEdit = function(localServerUrl, content, basename, callback){
	var url = localServerUrl+'edit/'
	url += '?basename='+encodeURI(basename);
	url += '&content='+encodeURI(content);

	var request = new XMLHttpRequest();
	request.addEventListener('load', function(){
		var responseJSON = JSON.parse(this.responseText);
		if( responseJSON.status === 'ok' ){
			callback(null, responseJSON.newContent)				
		}else{
			callback(responseJSON.status, responseJSON.newContent)
		}
	})
	request.addEventListener('error', function(){
		callback('error', null)
	})
	// FIXME sync XMLHttpRequest
	request.open("get", url);
	
  request.send();
}
