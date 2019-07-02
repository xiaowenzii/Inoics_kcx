var imageIndexIdNum = 0;
var maxSize = 4;//照片最大数量
var feedback = {
	imageList: document.getElementById('image-list')
};
feedback.filesBase64Data = [];

feedback.addFile = function(rst,index) {
	feedback.filesBase64Data.push({
		base64: rst.base64,
		path: rst.origin,
		id:'base64-'+index
	});
};

/**
 * 初始化图片域占位
 */
feedback.newSpaceHolder = function() {
	feedback.imageList = document.getElementById('image-list');
	var childs = feedback.imageList.childNodes;
	var placeholder = document.createElement('div');
	placeholder.setAttribute('class', 'image-item space');
	placeholder.setAttribute('isup','1');
	var up = document.createElement("div");
	up.setAttribute('class', 'image-up')
	
	var fileInput = document.createElement('div');
	fileInput.setAttribute('class', 'file');
	fileInput.addEventListener('click', function(event) {
		var self = fileInput;
		
		function getCameraOptions() {
			var cameraOptions = {
				quality: 50,
				destinationType: 1,//navigator.camera.DestinationType.FILE_URI,
				sourceType: 1,//navigator.camera.PictureSourceType.CAMERA,
				targetWidth: 1600,
				targetHeight: 1200,
				encodingType: 0,//Camera.EncodingType.JPEG,
				saveToPhotoAlbum: true
			};
			return cameraOptions;
		}

		function onSuccess(imageURI) {
			feedback.newDbSpaceHolder(imageURI);
		}

		//参数为string类型
		function onError(cameraError) {
			console.log("onError() cameraError:" + cameraError);
		}
		
		try{
			//使用这边调用可以获取图像URL[和下面的只能调用一个方法]
			window.getPicture(onSuccess, onError, getCameraOptions());
		}catch(e){
			console.log("拍照硬件不支持");
		}
	}, false);
	placeholder.appendChild(up);
	placeholder.appendChild(fileInput);
	feedback.imageList.appendChild(placeholder);
};


feedback.newDbSpaceHolder = function(fileName) {
	feedback.imageList = document.getElementById('image-list');
	var childs = feedback.imageList.childNodes;
	imageIndexIdNum++;
	if(childs&&childs.length>0){
		feedback.imageList.removeChild(childs[childs.length-1]);
	}else{
		feedback.newSpaceHolder();
	}
	
	lrz(fileName).then(function(rst) {//rst.origin rst.base64
		// 处理成功会执行
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		placeholder.setAttribute('id','div-'+imageIndexIdNum);
		placeholder.setAttribute('isup','0');
		feedback.addFile(rst,imageIndexIdNum);
		console.log(rst.base64);
		//删除图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.id = "close-" + imageIndexIdNum;
		closeButton.addEventListener('click',function(){
			var childs = feedback.imageList.childNodes;
			
			var index = this.id.split("-")[1];
			var div = document.getElementById('div-'+index);
			feedback.imageList.removeChild(div);
			
			for(var i=0;i<feedback.filesBase64Data.length;i++){
				if(feedback.filesBase64Data[i].id=="base64-"+index){
					var data = feedback.filesBase64Data[i].base64;
					data = null;
					feedback.filesBase64Data.splice(i,1);
				}
			}
			if(childs.length==(maxSize-1)){
				var hasup = false;
				for(var i=0;i<childs.length;i++){
					if(childs[i].getAttribute('isup')=='1'){
						hasup = true;
						break;
					}
				}
				if(hasup) return;
				feedback.newSpaceHolder();
			}
		},false);
		
		var fileInput = document.createElement('div');
		fileInput.setAttribute('class', 'file');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		placeholder.style.backgroundImage = 'url(' + rst.origin+ ')';
		
		placeholder.appendChild(closeButton);
		placeholder.appendChild(fileInput);
		feedback.imageList.appendChild(placeholder);
		
		childs = feedback.imageList.childNodes;
		if(childs.length<maxSize){
			feedback.newSpaceHolder();
		}
	});
};


feedback.init = function(){
	imageIndexIdNum = 0;
	feedback.filesBase64Data = [];
	feedback.newSpaceHolder();
}