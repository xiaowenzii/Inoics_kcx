angular.module('train.cordova.services', [])
	.factory('cordovaService', ['$rootScope', 'ionicService', function($rootScope, ionicService) {
		var cordovaUtils = {
			/**
			 * cordova拍照
			 * @param {Object} callback
			 */
			getPicture: function(callback) {
				try {
					if (isAndroid) {
						navigator.camera.getPicture(callback, function(cameraError) {
							ionicService.toast("拍照失败", 1000);
							console.log("onError() cameraError:" + cameraError);
						}, {
							quality: 100,
							destinationType: Camera.DestinationType.FILE_URI,
							sourceType: Camera.PictureSourceType.CAMERA,
							targetWidth: 800,
							targetHeight: 400,
							encodingType: 0, //Camera.EncodingType.JPEG,
							saveToPhotoAlbum: true,
							allowEdit: false
						});
					} else {
						navigator.camera.getPicture(callback, function(cameraError) {
							ionicService.toast("拍照失败", 1000);
							console.log("onError() cameraError:" + cameraError);
						}, {
							quality: 50,
							destinationType: Camera.DestinationType.FILE_URI
						});
					}
				} catch (e) {
					ionicService.toast("拍照硬件不支持", 1000);
				}
			},
			/**
			 * cordova 从相册中选取照片
			 * @param {Object} callback
			 */
			getPictureFromAlbum: function(callback) {
				try {
					if (isAndroid) {
						navigator.camera.getPicture(callback, function(cameraError) {
							ionicService.toast("获取照片失败", 1000);
							console.log("onError() cameraError:" + cameraError);
						}, {
							quality: 100,
							destinationType: Camera.DestinationType.FILE_URI,
							sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
							targetWidth: 800,
							targetHeight: 400,
							allowEdit: false
						});
					} else {
						navigator.camera.getPicture(callback, function(cameraError) {
							ionicService.toast("获取照片失败", 1000);
							console.log("onError() cameraError:" + cameraError);
						}, {
							quality: 50,
							destinationType: Camera.DestinationType.FILE_URI
						});
					}
				} catch (e) {
					ionicService.toast("拍照硬件不支持", 1000);
				}
			},
			
			/**
			 * 数据库操作
			 * operateType: 操作类型:增'save', 删'delete', 改'update', 查'search'
			 */
			sqlOperate: function(operateType){
				SqlOperate.SqlOperate(operateType, '', function(data) {
					console.log("onSuccess() data : " + data);
				}, function(msg) {
					console.log("onError() msg : " + msg);
				});
			},
			
			/**
			 * 数据库操作
			 * operateType: 操作类型:增'save', 删'delete', 改'update', 查'search'
			 */
			idcardScan: function(side){
				Idcard.Idcard(side, '', function(data) {
					console.log("onSuccess() data : " + data);
				}, function(msg) {
					console.log("onError() msg : " + msg);
				});
			}
		};
		return cordovaUtils;
	}])
