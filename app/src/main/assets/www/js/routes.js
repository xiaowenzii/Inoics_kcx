angular.module('train.routes', [])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider

			/****************************************
			 * 登录界面
			 ***************************************/
			.state("login", {
				url: "/login",
				cache: true,
				views: {
					'main-view': {
						templateUrl: "login.html",
						controller: "loginCtrl"
					}
				}
			})
			/****************************************
			 * 主界面
			 ***************************************/
			.state("tab", {
				url: "/tab",
				cache: true,
				views: {
					'main-view': {
						templateUrl: "templates/tabs.html",
						controller: "tabsCtrl"
					}
				}
			})
			.state('tab.tab1', {
				url: '/tab1',
				cache: true,
				views: {
					'tab-tab1': {
						templateUrl: 'templates/tab1.html',
						controller: "tab1Ctrl"
					}
				}
			})
			.state('tab.tab2', {
				url: '/tab2',
				cache: true,
				views: {
					'tab-tab2': {
						templateUrl: 'templates/tab2.html',
						controller: "tab2Ctrl"
					}
				}
			})
			.state('tab.tab3', {
				url: '/tab3',
				cache: false,
				views: {
					'tab-tab3': {
						templateUrl: 'templates/tab3.html',
						controller: "tab3Ctrl"
					}
				}
			})

			.state("clendarDouble", {
				url: '/clendarDouble/:startTime, :endTime',
				cache: false,
				views: {
					'main-view': {
						templateUrl: "templates/clendar_double.html",
						controller: "clendarDoubleCtrl"
					}
				}
			})
			
			.state("chartroom", {
				url: '/chartroom',
				cache: false,
				views: {
					'main-view': {
						templateUrl: "templates/chart/chartroom.html",
						controller: "chartroomCtrl"
					}
				}
			})
		$urlRouterProvider.otherwise("/login");
	}]);
