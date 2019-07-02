angular.module('train.ionic.services', [])

	.factory('ionicService', ['$ionicLoading', '$ionicHistory', '$ionicPopup', function($ionicLoading, $ionicHistory, $ionicPopup) {
		return {
			/**
			 * 显示加载页面
			 * 
			 * operation 加载文字
			 */
			showIonicLoading: function(operation) {
				var template = '<p class="item-myicon"><ion-spinner icon="circles" class="spinner-balanced"></ion-spinner><span></br>' + operation + '···</p>';
				$ionicLoading.show({
					content: 'Loading...',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0,
					template: template,
				});
			},

			/**
			 * 隐藏加载页面
			 */
			hideIonicLoading: function() {
				$ionicLoading.hide();
			},

			/**
			 * toast
			 * 
			 * msg 			显示内容
			 * duration		显示时长，默认800毫秒
			 */
			toast: function(msg, duration) {
				duration = isNaN(duration) ? 800 : duration;
				var m = document.createElement('div');
				m.innerHTML = msg;
				m.style.cssText = "width: 60%; min-width: 96px; background: #000; opacity: 0.5; height: 40px; color: #fff; line-height: 40px; text-align: center; border-radius: 5px; position: fixed; top: 50%; left: 20%; z-index: 999999; font-weight: bold;";
				document.body.appendChild(m);
				setTimeout(function() {
					var d = 0.5;
					m.style.webkitTransition = '-webkit-transform ' + d +
						's ease-in, opacity ' + d + 's ease-in';
					m.style.opacity = '0';
					setTimeout(function() {
						document.body.removeChild(m);
					}, d * 1000);
				}, duration);
			},

			/**
			 * 返回上一页面
			 */
			goBack: function() {
				$ionicHistory.goBack();
			},

			/**
			 * 弹出一个自定义弹窗，并返回一个弹窗实例
			 * 
			 * template 		模板
			 * title			标题
			 * scope			scope变量
			 * cancelText		按钮文字，如取消
			 * positiveText		按钮文字，如确定
			 * onCancel			响应取消按钮的方法
			 * onClick			响应确定按钮的方法
			 */
			showIonicPopup: function(template, title, scope, cancelText, positiveText, onCancel, onClick) {
				var mypopup = $ionicPopup.show({
					template: template,
					title: title,
					scope: scope,
					buttons: [{
						text: cancelText,
						type: 'button-default',
						onTap: onCancel
					}, {
						text: positiveText,
						type: 'button-positive',
						onTap: onClick
					}, ]
				});

				return mypopup;
			},

			/**
			 * 隐藏自定义弹窗
			 * 
			 * mypopup 需隐藏的弹窗实例
			 */
			hideIonicPopup: function(mypopup) {
				if(mypopup != null) {
					myPopup.close();
				}
			},
		}
	}])