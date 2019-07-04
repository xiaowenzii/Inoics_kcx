angular.module('train.controllers', [
		'train.clendardouble.controllers',
		'train.chart.controllers'
	])
	.controller('loginCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$ionicLoading', 'ionicService', function(
		$rootScope, $scope, $state, $timeout, $ionicLoading, ionicService, stateService) {
		$scope.vc = {
			//登入
			dologin: function() {
				$state.go("tab");
			}
		}
	}])

	.controller('tabsCtrl', ['$rootScope', '$scope', '$stateParams', '$timeout', function($rootScope, $scope, $stateParams,
		$timeout) {}])

	.controller('tab1Ctrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $timeout, $ionicLoading,
		$ionicPopup, ionicService, formatService, stateService) {
		$scope.vo = {
			msgList: MESAGE
		}

		$scope.vc = {
			//去聊天室
			goChartroom: function(item) {
				stateService.chartroom(JSON.stringify(item));
			}
		}

		$scope.ready = (function() {
			$scope.vo.moreCon = $scope.vo.moreTuition;
		})()
	})

	.controller('tab2Ctrl', function($rootScope, $scope, $state, $ionicHistory, $interval, $timeout, $ionicLoading,
		$location, $ionicPopup, ionicService, formatService, stateService, cordovaService) {
		$scope.vo = {
			aaa: '城市',
			itemI: {
				province: ITEM_DEFUALT1,
				level: ITEM_DEFUALT1,
				classify: ITEM_DEFUALT1,
				more: ITEM_DEFUALT1
			},
			itemII: {
				city: false
			},
			hideItem: false,
			//省份
			province: {
				selected: '0000',
				provinceList: PROVINCE_LIST
			},
			//城市
			city: {
				selected: '',
				cityList: []
			},
			cityJx: CITY_JX,
			cityHb: CITY_HB,
			//学校级别数据
			level: {
				selected: '0000',
				levelList: SCHOOL_LEVEL_LIST
			},
			//分类数据
			classify: {
				checked: '',
				classifyList: CLASSFY_LIST
			},
			//更多
			moreType: {
				selected: '0000',
				moreTypeList: MORE_TYPE_LIST
			},
			moreCon: {},
			moreTuition: {
				checked: '',
				dataList: MORE_TUITION_LIST
			},
			morePersonNum: {
				checked: '',
				dataList: MORE_PERSON_NUM_LIST
			},
			sj: formatService.formatDate(new Date()),
			maxtime: '2030.12.12'
		}

		$scope.vc = {
			//保存数据
			save: function() {
				if (iscordova) {
					cordovaService.sqlOperate('save');
				} else {
					ionicService.toast("非移动端操作", 1000);
				}
			},
			//查询数据
			search: function() {
				if (iscordova) {
					cordovaService.sqlOperate('search');
				} else {
					ionicService.toast("非移动端操作", 1000);
				}
			},
		}


		$scope.ready = (function() {
			$scope.vo.moreCon = $scope.vo.moreTuition;
		})()
	})

	.controller('tab3Ctrl', function($rootScope, $scope, $state, $ionicHistory, $ionicLoading, $ionicScrollDelegate,
		$ionicPopup, $timeout, formatService, stateService, cordovaService) {
		$scope.vo = {
			maxtime: '2030.12.12',
			startTime: formatService.formatDate(new Date()),
			endTime: formatService.formatDate(new Date())
		}

		$scope.vc = {
			//选择时间
			chooseTime: function() {
				stateService.chooseTime($scope.vo.startTime, $scope.vo.endTime);
			},
			//身份证正面识别
			front: function(){
				if (iscordova) {
					cordovaService.idcardScan("front");
				} else {
					ionicService.toast("非移动端操作", 1000);
				}
			},
			//身份证反面识别
			back: function(){
				if (iscordova) {
					cordovaService.idcardScan("back");
				} else {
					ionicService.toast("非移动端操作", 1000);
				}
			}
		}

		$scope.ready = (function() {
			if ($rootScope.startTime != undefined && $rootScope.startTime != null) {
				$scope.vo.startTime = $rootScope.startTime;
			}
			if ($rootScope.endTime != undefined && $rootScope.endTime != null) {
				$scope.vo.endTime = $rootScope.endTime;
			}
		})()
	})
