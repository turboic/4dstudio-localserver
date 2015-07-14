var NativeFileEdit = function(localServerUrl, content, basename, callback){
	// build the url to call
	var url = localServerUrl+'edit/'
	url += '?basename='+encodeURI(basename);
	url += '&content='+encodeURI(content);

	// build the request
	var request = new XMLHttpRequest();
	
	// bind 'load' to collect result
	request.addEventListener('load', function(){
		var responseJSON = JSON.parse(this.responseText);
		if( responseJSON.status === 'ok' ){
			callback(null, responseJSON.newContent)				
		}else{
			callback(responseJSON.status, responseJSON.newContent)
		}
	})
	
	// bind error to get connection refused error
	request.addEventListener('error', function(){
		callback('error', null)
	})

	// do the actual request
	request.open("get", url);	
  request.send();
}
