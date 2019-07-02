angular.module('train.directives', [])
	//日期选择
	.directive("inputDatetime", ['formatService', function(formatService) {
		return {
			restrict: 'AE',
			require: 'ngModel',
			scope: {
				min: '=',
				max: '=',
				ngModel: '=',
				ngDisabled: '='
			},
			link: function(scope, element, attr, ctrl) {
				element = $(element[0]);
				var ngDisabled = scope.ngDisabled;
				if (!attr.format || attr.format == 'yyyy-MM-dd') {
					var options = {
						theme: 'android-holo-light',
						lang: 'zh',
						display: 'bottom',
						disabled: ngDisabled,
						buttons: ['clear', 'cancel', 'set'],
						dateFormat: 'yy-mm-dd',
						onSet: function(value, inst) {
							scope.ngModel = value.valueText;
							scope.$apply();
						},
						onClear: function() {
							scope.ngModel = '';
						}
					};
					if (scope.ngModel) {
						options.defaultValue = formatService.parseDate(scope.ngModel);
					}
					var instance = element.mobiscroll();
					instance.date(options);
					scope.$watch('min', function(value) {
						if (value) {
							options.min = formatService.parseDate(value);
						} else {
							options.min = (function() {
								var date = new Date();
								date.setFullYear(1900);
							})();
						}
						if (scope.ngModel) {
							options.defaultValue = formatService.parseDate(scope.ngModel);
						}
						instance.date(options);
					});
					scope.$watch('max', function(value) {
						if (value) {
							options.max = formatService.parseDate(value);
						} else {
							options.max = new Date();
						}
						if (scope.ngModel) {
							options.defaultValue = formatService.parseDate(scope.ngModel);
						}
						instance.date(options);
					});
				}

				if (attr.format == 'yyyy') {
					var options = {
						theme: 'android-holo-light',
						lang: 'zh',
						display: 'bottom',
						disabled: ngDisabled,
						buttons: ['clear', 'cancel', 'set'],
						dateFormat: 'yy',
						onSet: function(value, inst) {
							scope.ngModel = value.valueText;
							scope.$apply();
						},
						onClear: function() {
							scope.ngModel = '';
							scope.$apply();
						}
					};
					if (scope.ngModel) {
						options.defaultValue = formatService.parseDate(scope.ngModel);
					}
					var instance = element.mobiscroll();
					instance.date(options);
					scope.$watch('min', function(value) {
						if (value) {
							options.min = formatService.parseDate(value);
						} else {
							options.min = (function() {
								var date = new Date();
								date.setFullYear(1900);
							})();
						}
						if (scope.ngModel) {
							options.defaultValue = formatService.parseDate(scope.ngModel);
						}
						instance.date(options);
					});
					scope.$watch('max', function(value) {
						if (value) {
							options.max = formatService.parseDate(value);
						} else {
							options.max = new Date();
						}
						if (scope.ngModel) {
							options.defaultValue = formatService.parseDate(scope.ngModel);
						}
						instance.date(options);
					});
				}


				if (attr.format == 'yyyy-MM-dd HH:mm') {
					var options = {
						theme: 'android-holo-light',
						lang: 'zh',
						display: 'bottom',
						disabled: ngDisabled,
						buttons: ['clear', 'cancel', 'set'],
						dateFormat: 'yy-mm-dd',
						timeFormat: 'HH:2',
						onSet: function(value, inst) {
							scope.ngModel = value.valueText;
							scope.$apply();
						},
						onClear: function() {
							scope.ngModel = '';
							scope.$apply();
						}
					};
					if (scope.ngModel) {
						options.defaultValue = formatService.parseDate(scope.ngModel, attr.format);
					}
					var instance = element.mobiscroll();
					instance.datetime(options);
					scope.$watch('min', function(value) {
						if (value) {
							options.min = formatService.parseDate(value, attr.format);
						} else {
							options.min = (function() {
								var date = new Date();
								date.setFullYear(1900);
							})();
						}
						if (scope.ngModel) {
							options.defaultValue = formatService.parseDate(scope.ngModel, attr.format);
						}
						instance.datetime(options);
					});
					scope.$watch('max', function(value) {
						if (value) {
							options.max = formatService.parseDate(value, attr.format);
						} else {
							options.max = new Date();
						}
						if (scope.ngModel) {
							options.defaultValue = formatService.parseDate(scope.ngModel, attr.format);
						}
						instance.datetime(options);
					});
				}

				if (attr.format == 'yyyy/MM/dd') {
					var options = {
						theme: 'android-holo-light',
						lang: 'zh',
						display: 'bottom',
						disabled: ngDisabled,
						buttons: ['clear', 'cancel', 'set'],
						dateFormat: 'yy/mm/dd',
						timeFormat: '',
						onSet: function(value, inst) {
							scope.ngModel = value.valueText;
							scope.$apply();
						},
						onClear: function() {
							scope.ngModel = '';
							scope.$apply();
						}
					};
					if (scope.ngModel) {
						options.defaultValue = formatService.parseDate(scope.ngModel, attr.format);
					}
					var instance = element.mobiscroll();
					instance.datetime(options);
					scope.$watch('min', function(value) {
						if (value) {
							options.min = formatService.parseDate(value, attr.format);
						} else {
							options.min = (function() {
								var date = new Date();
								date.setFullYear(1900);
							})();
						}
						if (scope.ngModel) {
							options.defaultValue = formatService.parseDate(scope.ngModel, attr.format);
						}
						instance.datetime(options);
					});
					scope.$watch('max', function(value) {
						if (value) {
							options.max = formatService.parseDate(value, attr.format);
						} else {
							options.max = new Date();
						}
						if (scope.ngModel) {
							options.defaultValue = formatService.parseDate(scope.ngModel, attr.format);
						}
						instance.datetime(options);
					});
				}

				if (attr.format == 'HH:mm') {
					var options = {
						theme: 'android-holo-light',
						lang: 'zh',
						display: 'bottom',
						disabled: ngDisabled,
						buttons: ['clear', 'cancel', 'set'],
						timeFormat: 'HH:2',
						onSet: function(value, inst) {
							scope.ngModel = value.valueText;
							scope.$apply();
						},
						onClear: function() {
							scope.ngModel = '';
							scope.$apply();
						}
					};
					if (scope.ngModel) {
						options.defaultValue = scope.ngModel;
					}
					var instance = element.mobiscroll();
					instance.time(options);
					scope.$watch('min', function(value) {
						var date = new Date();
						if (value) {
							var array = value.split(':');
							date.setHours(array[0]);
							date.setMinutes(array[1]);
						} else {
							date.setHours(0);
							date.setMinutes(0);
						}
						options.min = date;
						instance.time(options);
					});
					scope.$watch('max', function(value) {
						var date = new Date();
						if (value) {
							var array = value.split(':');
							date.setHours(array[0]);
							date.setMinutes(array[1]);
						} else {
							date.setHours(23);
							date.setMinutes(59);
						}
						options.max = date;
						instance.time(options);
					});
				}
			}
		}
	}])

	//多选, 单选,级联单选, 多选
	.directive('searchHeader', function($http, dataPicker) {
		return {
			restrict: 'EAMC',
			replace: false,
			scope: {
				aaa: '=aaa',
				item1: '=item1',
				item2: '=item2',
				hideitem: '=hideitem',
				province: '=province',
				city: '=city',
				cityjx: '=cityjx',
				cityhb: '=cityhb',
				level: '=level',
				classify: '=classify',
				moretype: '=moretype',
				morecon: '=morecon',
				moretuition: '=moretuition',
				morepersonnum: '=morepersonnum'
			},
			transclude: true,
			templateUrl: 'templates/searchheader.html',
			link: function(scope, element) {
				//条件帅选
				scope.MenuIChange = function(type) {
						var hideall = scope.item1[type] == ITEM_SELECTED;
						scope.hideitem = !hideall;
						//隐藏所有的条件选择框
						scope.item1.province = ITEM_DEFUALT1;
						scope.item1.level = ITEM_DEFUALT1;
						scope.item1.classify = ITEM_DEFUALT1;
						scope.item1.more = ITEM_DEFUALT1;

						//显示条件选择框
						if (scope.hideitem) {
							scope.item1[type] = ITEM_SELECTED;
						}
					},
					//条件改变
					scope.conditionChange = function(type, value) {
						switch (type) {
							case 'province':
								scope.province.selected = value.code;
								if (value.code != '0000') {
									scope.item2.city = true;
									if (value.code == '0001') {
										scope.city.cityList = scope.cityjx;
										scope.city.selected = scope.cityjx[0].code;
										console.log(scope.city.selected);
									} else if (value.code == '0002') {
										scope.city.cityList = scope.cityhb;
										scope.city.selected = scope.cityhb[0].code;
										console.log(scope.city.selected);
									}
								} else {
									scope.city.selected = '';
									scope.item2.city = false;
									console.log('全部');
								}
								break;
							case 'city':
								scope.city.selected = value.code;
								console.log(scope.city.selected);
								break;
							case 'level':
								scope.level.selected = value.code;
								console.log(scope.level.selected);
								break;
							case 'classify':
								for (var i = 0; i < scope.classify.classifyList.length; i++) {
									if (scope.classify.classifyList[i].code == value.code) {
										scope.classify.classifyList[i].checked = !scope.classify.classifyList[i].checked;
									}
									//输出 选中的值
									if (scope.classify.classifyList[i].checked) {
										console.log(scope.classify.classifyList[i].code);
									}
								}
								break;
							case 'moretype':
								scope.moretype.selected = value.code;
								if (scope.moretype.selected == '0000') {
									scope.morecon = scope.moretuition;
								} else {
									scope.morecon = scope.morepersonnum;
								}
								console.log(scope.morecon);
								break;
							case 'more':
								if (scope.moretype.selected == '0000') {
									for (var i = 0; i < scope.moretuition.dataList.length; i++) {
										if (scope.moretuition.dataList[i].code == value.code) {
											scope.moretuition.dataList[i].checked = !scope.moretuition.dataList[i].checked;
										}
										//输出 选中的值
										if (scope.moretuition.dataList[i].checked) {
											console.log(scope.moretuition.dataList[i].code);
										}
									}
								} else {
									for (var i = 0; i < scope.morepersonnum.dataList.length; i++) {
										if (scope.morepersonnum.dataList[i].code == value.code) {
											scope.morepersonnum.dataList[i].checked = !scope.morepersonnum.dataList[i].checked;
										}
										//输出 选中的值
										if (scope.morepersonnum.dataList[i].checked) {
											console.log(scope.morepersonnum.dataList[i].code);
										}
									}
								}
								break;
						}
					}
			}
		}
	})
