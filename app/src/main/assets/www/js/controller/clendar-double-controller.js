angular.module('train.clendardouble.controllers', [])
	.controller('clendarDoubleCtrl', function($rootScope, $scope, $state, $ionicHistory, $ionicLoading, $ionicScrollDelegate,
		$ionicPopup, $timeout, $stateParams, formatService) {
		$scope.vo = {
			//当前 年,月,日, 假期日
			currentDay: '',
			currentMonth: '',
			currentYear: '',
			glHoliday: '',
			nlHoliday: '',
			nlDate: '',

			//天干地支,生肖等常量,全局变量定义
			calendarData: CALENDAR_DATA,
			madd: MADD,
			tgStr: TG,
			dzStr: DZ,
			numStr: NUM_CHINESE,
			monStr: NUM_MON,
			weekStr: NUM_WEEK,
			sx: SX,
			cYear: '',
			cMonth: '',
			cDay: '',
			theDate: '',
			//总月份和天数集合
			dateData: [],
			startTime: $stateParams.startTime,
			endTime: $stateParams.endTime,
			chooseCs: 0
		}

		$scope.vc = {
			//创建日历
			initTime: function() {
				//初始化显示 当前年和月
				var now = new Date();
				$scope.vo.currentYear = now.getFullYear();
				$scope.vo.currentMonth = now.getMonth() + 1;
				$scope.vo.currentDay = now.getDate();
				$scope.vo.glHoliday = $scope.vc.getHolidays($scope.vo.currentMonth, $scope.vo.currentDay);
				//展示指定的年和月的所有日期
				$scope.vc.preMonth($scope.vo.currentYear, $scope.vo.currentMonth);
				$scope.vc.showCleander($scope.vo.currentYear, $scope.vo.currentMonth);
				$scope.vc.lastMonth($scope.vo.currentYear, $scope.vo.currentMonth);
			},
			//前一个月
			preMonth: function(year, month) {
				if (month == 1) {
					year = year - 1;
					month = 12;
				} else {
					month = month - 1;
				}
				$scope.vc.showCleander(year, month);
			},
			//后一个月
			lastMonth: function(year, month) {
				if (month == 12) {
					year = year + 1;
					month = 1;
				} else {
					month = month + 1;
				}
				$scope.vc.showCleander(year, month);
			},
			//选择时间
			chooseTime: function(dayItem) {
				if (dayItem != undefined) {
					switch ($scope.vo.chooseCs) {
						case 0:
							$scope.vo.chooseCs = 1;
							$scope.vo.startTime = dayItem.alltime;
							$scope.vo.endTime = '';
							break;
						case 1:
							$scope.vo.chooseCs = 2;
							if ($scope.vo.startTime > dayItem.alltime) {
								$scope.vo.endTime = $scope.vo.startTime;
								$scope.vo.startTime = dayItem.alltime;
							} else {
								$scope.vo.endTime = dayItem.alltime;
							}
							break;
						case 2:
							$scope.vo.chooseCs = 1;
							$scope.vo.startTime = dayItem.alltime;
							$scope.vo.endTime = '';
							break;
					}
				}
			},
			//确定选则
			confirmChoose: function() {
				var item = {};
				$rootScope.startTime = $scope.vo.startTime;
				$rootScope.endTime = $scope.vo.endTime;
				$ionicHistory.goBack();
			},
			//设置选中的时间
			setChooseTimeStyle: function(item) {
				if (item != undefined) {
					if (item.alltime == $scope.vo.startTime && item.alltime == $scope.vo.endTime) {
						return {
							'width': '14.2%',
							'margin-top': '6px',
							'background-image': 'url(img/start_end_time.png)',
							'background-size': '100% 100%',
							'background-repeat': 'no-repeat'
						};
					} else if (item.alltime == $scope.vo.startTime) {
						return {
							'width': '14.2%',
							'margin-top': '6px',
							'background-image': 'url(img/start_time.png)',
							'background-size': '100% 100%',
							'background-repeat': 'no-repeat'
						};
					} else if (item.alltime == $scope.vo.endTime) {
						return {
							'width': '14.2%',
							'margin-top': '6px',
							'background-image': 'url(img/end_time.png)',
							'background-size': '100% 100%',
							'background-repeat': 'no-repeat'
						};
					} else if (item.alltime < $scope.vo.endTime && item.alltime > $scope.vo.startTime) {
						return {
							'width': '14.2%',
							'margin-top': '6px',
							'background': '#AFEEEE',
							'background-size': '100% 100%',
							'background-repeat': 'no-repeat'
						};
					}
					return {
						'width': '14.2%',
						'margin-top': '6px',
						'background': 'none',
						'background-size': '100% 100%',
						'background-repeat': 'no-repeat'
					};
				}
			},
			//展示指定的年和月的所有日期
			showCleander: function(year, month) {
				$scope.vo.nlDate = $scope.vc.getLunarCalendar(year, month, $scope.vo.currentDay)
				$scope.vo.glHoliday = $scope.vc.getHolidays(month, $scope.currentDay);
				$scope.vo.nlHoliday = $scope.vc.getnlHolidays($scope.vo.nlDate);
				var dayList = [];

				var beforeDays = [];
				//得到表示指定年和月的1日的那个时间对象
				var date = new Date(year, month - 1, 1);
				//判断这个月1号是星期几，添加响应空格
				var dayOfWeek = date.getDay();
				var stack = [];
				for (var i = 0; i < dayOfWeek; i++) {
					stack.push(beforeDays.pop());
				}
				stack.reverse();
				for (var i = 0; i < dayOfWeek; i++) {
					stack.push(beforeDays.pop());
					dayList.push(stack.shift());
				}

				//计算一个月有多少天
				var daysOfMonth = $scope.vc.monthContainDays(year, month);
				//从1号开始添加日历数字
				for (var i = 1; i <= daysOfMonth; i++) {
					var day = {};
					day.day = i;
					day.month = month;
					day.year = year;
					day.alltime = year + '-' + (month.length > 1 ? month : ('0' + month)) + '-' + ((i + '').length > 1 ? (i + '') :
						('0' + i));
					day.nldate = $scope.vc.getLunarCalendar(year, month, i);
					day.glHoliday = $scope.vc.getHolidays(month, i);
					day.nlHoliday = $scope.vc.getnlHolidays(day.nldate);
					if (day.glHoliday || day.nlHoliday) {
						day.isHoliday = true;
					} else {
						day.isHoliday = false;
					}
					dayList.push(day);
				}

				//添加每月天数
				var param = {};
				param.year = year;
				param.month = month;
				param.dayList = dayList;
				$scope.vo.dateData.push(param);
			},
			//在日历显示节假日
			showHoliday: function(day) {
				if (day == undefined || day == null) {
					return '';
				}
				if (day.nlHoliday || day.glHoliday) {
					if (day.nlHoliday) {
						return day.nlHoliday;
					} else {
						return day.glHoliday;
					}
				} else {
					return day.nldate.day;
				}
			},
			//返回月份包含的天数 
			monthContainDays: function(year, month) {
				return new Date(year, month, 0).getDate();
			},
			//获取农历日期
			getLunarDay: function(solarYear, solarMonth, solarDay) {
				if (solarYear < 1921 || solarYear > 2020) {
					return "";
				} else {
					solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
					$scope.vc.nlTrans(solarYear, solarMonth, solarDay);
					return $scope.vc.setNlDate(solarYear);
				}
			},
			//获取当前农历
			getLunarCalendar: function(year, month, day) {
				if (year < 100) {
					year = "19" + year;
				}
				return $scope.vc.getLunarDay(year, month, day);
			},
			//设置农历日期
			setNlDate: function(year) {
				var tmp = new Object();
				tmp.month = "";
				tmp.day = "";
				if ($scope.vo.cMonth < 1) {
					tmp.month += "(闰)";
					tmp.month += $scope.vo.monStr.charAt(-$scope.vo.cMonth - 1);
				} else {
					tmp.month += $scope.vo.monStr.charAt($scope.vo.cMonth - 1);
				}
				tmp.year = year;
				tmp.month += "月";
				tmp.day += ($scope.vo.cDay < 11) ? "初" : (($scope.vo.cDay < 20) ? "十" : (($scope.vo.cDay < 30) ? "廿" : "三十"));
				if ($scope.vo.cDay % 10 != 0 || $scope.vo.cDay == 10) {
					tmp.day += $scope.vo.numStr.charAt(($scope.vo.cDay - 1) % 10);
				}
				return tmp;
			},
			//获取公历节假日名称
			getHolidays: function(month, date) {
				var holiday = "";
				if ((month == 1) && (date == 1)) {
					holiday = "元旦";
				}

				if ((month == 3) && (date == 12)) {
					holiday = "植树节";
				}

				if ((month == 4) && (date == 5)) {
					holiday = "清明";
				}

				if ((month == 5) && (date == 1)) {
					holiday = "劳动节";
				}

				if ((month == 5) && (date == 4)) {
					holiday = "青年节";
				}

				if ((month == 6) && (date == 1)) {
					holiday = "儿童节";
				}

				if ((month == 8) && (date == 1)) {
					holiday = "建军节";
				}

				if ((month == 8) && (date == 16)) {
					holiday = "情人节";
				}

				if ((month == 10) && (date == 1)) {
					holiday = "国庆节";
				}

				if ((month == 12) && (date == 25)) {
					holiday = "圣诞节";
				}
				return holiday;
			},
			//获取农历节假日名称
			getnlHolidays: function(nldate) {
				nldate = nldate.month + nldate.day;
				var nlHolidays = "";
				if (nldate == "正月初一") {
					nlHolidays = "春节";
				}
				if (nldate == "正月十五") {
					nlHolidays = "元宵节";
				}
				if (nldate == "五月初五") {
					nlHolidays = "端午节";
				}
				if (nldate == "七月初七") {
					nlHolidays = "七夕";
				}
				if (nldate == "七月十五") {
					nlHolidays = "中元节";
				}
				if (nldate == "八月十五") {
					nlHolidays = "中秋节"
				}
				if (nldate == "九月初九") {
					nlHolidays = "重阳节"
				}
				if (nldate == "腊月初八") {
					nlHolidays = "腊八节"
				}
				if (nldate == "腊月廿四") {
					nlHolidays = "小年"
				}
				return nlHolidays;
			},
			getBit: function(m, n) {
				return (m >> n) & 1;
			},
			//农历转换
			nlTrans: function() {
				$scope.vo.theDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
				var total, m, n, k;
				var isEnd = false;
				var tmp = $scope.vo.theDate.getYear();
				if (tmp < 1900) {
					tmp += 1900;
				}
				total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + $scope.vo.madd[$scope.vo.theDate.getMonth()] +
					$scope.vo.theDate.getDate() - 38;

				if ($scope.vo.theDate.getYear() % 4 == 0 && $scope.vo.theDate.getMonth() > 1) {
					total++;
				}
				for (m = 0;; m++) {
					k = ($scope.vo.calendarData[m] < 0xfff) ? 11 : 12;
					for (n = k; n >= 0; n--) {
						if (total <= 29 + $scope.vc.getBit($scope.vo.calendarData[m], n)) {
							isEnd = true;
							break;
						}
						total = total - 29 - $scope.vc.getBit($scope.vo.calendarData[m], n);
					}
					if (isEnd) break;
				}
				$scope.vo.cYear = 1921 + m;
				$scope.vo.cMonth = k - n + 1;
				$scope.vo.cDay = total;
				if (k == 12) {
					if ($scope.vo.cMonth == Math.floor($scope.vo.calendarData[m] / 0x10000) + 1) {
						$scope.vo.cMonth = 1 - $scope.vo.cMonth;
					}
					if ($scope.vo.cMonth > Math.floor($scope.vo.calendarData[m] / 0x10000) + 1) {
						$scope.vo.cMonth--;
					}
				}
			}
		}

		$scope.ready = (function() {
			//初始化时间
			$scope.vc.initTime();
			$timeout(function() {
				$ionicScrollDelegate.scrollBy(0, 248, false);
			}, 200)
		})()
	})
