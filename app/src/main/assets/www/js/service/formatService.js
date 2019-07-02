angular.module('train.format.services', [])

	//时间选择器
	.factory('formatService', [function() {
		var formatUtils = {
			toJSON: function(obj) {
				return JSON.stringify(obj);
			},
			fillZero: function(num) {
				return num < 10 ? '0' + num : '' + num;
			},
			formatDate: function(date, format) {
				format = format || 'yyyy-MM-dd';
				format = format.replace('yyyy', date.getFullYear());
				format = format.replace('MM', formatUtils.fillZero(date.getMonth() + 1));
				format = format.replace('dd', formatUtils.fillZero(date.getDate()));
				format = format.replace('HH', formatUtils.fillZero(date.getHours()));
				format = format.replace('mm', formatUtils.fillZero(date.getMinutes()));
				format = format.replace('ss', formatUtils.fillZero(date.getSeconds()));
				return format;
			},
			parseDate: function(dateText, format) {
				format = format || 'yyyy-MM-dd';
				var date = new Date();

				var yearIndex = format.indexOf('yyyy');
				var year = parseInt(dateText.substr(yearIndex, 4), 10);
				date.setFullYear(year);
				var monthIndex = format.indexOf('MM');
				var month = parseInt(dateText.substr(monthIndex, 2), 10) - 1;
				date.setMonth(month);
				var dayIndex = format.indexOf('dd');
				var day = parseInt(dateText.substr(dayIndex, 2), 10);
				date.setDate(day);
				var hourIndex = format.indexOf('HH');
				var hour = parseInt(dateText.substr(hourIndex, 2), 10);
				date.setHours(hour);
				var minuteIndex = format.indexOf('mm');
				var minute = parseInt(dateText.substr(minuteIndex, 2), 10);
				date.setMinutes(minute);
				var secondIndex = format.indexOf('ss');
				var second = parseInt(dateText.substr(secondIndex, 4), 10);
				date.setSeconds(second);

				return date;
			}
		};
		return formatUtils;
	}])
	
	.factory('dataPicker', ['$http', '$q', function ($http, $q) {
        return {
            query: function () {
                var lengthYear=100;
                var dataPicker={
                    month:[],
                    year:[],
                    day:[]
                };
                var data = new Date();
                var nowyear = data.getFullYear();
                for(var i=nowyear,j=0; i>nowyear-lengthYear;i--,j++){
                    dataPicker.year[j]=i;
                }
                for(var i=0;i<=11;i++){
                    if(i<9){
                        dataPicker.month[i]='0'+(i+1);
                    }else{
                        dataPicker.month[i]=String(i+1);
                    }
                }
                return dataPicker;
            }
        }
    }])
