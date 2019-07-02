angular.module('train.chart.controllers', [])
	.controller('chartroomCtrl', function($rootScope, $scope, $state, $timeout, $ionicLoading, ionicService, stateService,
		$ionicHistory) {

		$scope.vo = {
			chartList: CHART_RECORDS
		}
		$scope.vc = {
			goBack: function() {
				$ionicHistory.goBack();
			}
		}
	})
