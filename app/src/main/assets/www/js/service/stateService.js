angular.module('train.state.services', [])

	.factory('stateService', ['$ionicLoading', '$ionicHistory', '$state',
		function($ionicLoading, $ionicHistory, $state) {
			return {
				//双日历时间跳转
				chooseTime: function(startTime, endTime) {
					$state.go('clendarDouble', {
						startTime: startTime,
						endTime: endTime
					});
				},
				//跳转聊天室
				chartroom: function(item){
					$state.go('chartroom', {
						item: item
					});
				}
			}
		}
	])
