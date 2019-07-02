angular.module('train', ['ionic', 'train.routes', 'train.controllers', 'train.directives', 'train.services'])
	.run(['$ionicPlatform', '$ionicPopup', '$rootScope', '$location', '$ionicHistory', '$ionicLoading', '$state',
		'$templateCache', '$ionicViewSwitcher',
		function($ionicPlatform, $ionicPopup, $rootScope, $location, $ionicHistory, $ionicLoading, $state, $templateCache,
			$ionicViewSwitcher) {
			$ionicPlatform.ready(function() {
				/*if(device.platform === 'iOS') {
					try {
						ionic.Platform.setFullscreen(true, true);
					} catch(e) {}
					window.StatusBar.styleBlackOpaque();
					window.StatusBar.show();
				} else {
					if(window.StatusBar) {
						window.StatusBar.hide();
						ionic.Platform.setFullscreen(true, true);
					}
				}*/
			});

			$rootScope.$off = function(name, listener) {
				var namedListeners = this.$$listeners[name];
				if (namedListeners) {
					for (var i = 0; i < namedListeners.length; i++) {
						if (namedListeners[i] === listener) {
							this.$$listeners[name].splice(i, 1);
						}
					}
				}
			};

			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				angular.element(document).find('.mbsc-fr').remove();
			});

			function onResume() {
				$ionicLoading.show('正在重新登录...');
				$commonService.getUserInfo(function(data) {
					if (data.successful == true) {
						$commonService.toast('重新登录成功');
						$ionicLoading.hide();
					} else {
						$commonService.toast('重新登录失败');
						window.parent.navigator.app.exitApp();
						$ionicLoading.hide();
					}
				}, function(msg) {
					$commonService.toast(msg);
					$ionicLoading.hide();
					setTimeout(function() {
						window.parent.navigator.app.exitApp();
					}, 500);
				});
			}

			function onBackKeyDown(e) {
				ionicService.hideIonicLoading();
				if ($location.path() == '/tab/tab1' || $location.path() == '/tab/tab2' || $location.path() == '/tab/tab3') {
					CommonService.toast('再点击一次退出!');
					window.parent.document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
					window.parent.document.addEventListener("backbutton", exitApp, false); //绑定退出事件

					// 3秒后重新注册
					var intervalID = window.setInterval(function() {
						window.clearInterval(intervalID);
						window.parent.document.removeEventListener("backbutton", exitApp, false); // 注销返回键
						window.parent.document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
					}, 3000);
				} else if ($ionicHistory.backView()) {
					// Go back in history
					$ionicHistory.goBack();
					$ionicViewSwitcher.nextDirection("back");
					$rootScope.from_detail = '1';
				} else {
					CommonService.toast('再点击一次退出!');
					window.parent.document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
					window.parent.document.addEventListener("backbutton", exitApp, false); //绑定退出事件
					// 3秒后重新注册
					var intervalID = window.setInterval(function() {
						window.clearInterval(intervalID);
						window.parent.document.removeEventListener("backbutton", exitApp, false); // 注销返回键
						window.parent.document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
					}, 3000);
				}
				e.preventDefault();
				return false;
			}

			function exitApp() {}
		}
	])
	.config(['$ionicConfigProvider', function($ionicConfigProvider) {
		$ionicConfigProvider.platform.ios.tabs.style('standard');
		$ionicConfigProvider.platform.ios.tabs.position('bottom');
		$ionicConfigProvider.platform.android.tabs.style('standard');
		$ionicConfigProvider.platform.android.tabs.position('bottom');
		$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
		$ionicConfigProvider.platform.android.navBar.alignTitle('center');
		$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
		$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
		$ionicConfigProvider.platform.ios.views.transition('ios');
		$ionicConfigProvider.platform.android.views.transition('android');
		$ionicConfigProvider.views.swipeBackEnabled(false);
	}])
	.constant('$ionicLoadingConfig', {
		content: '加载中...',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	})
