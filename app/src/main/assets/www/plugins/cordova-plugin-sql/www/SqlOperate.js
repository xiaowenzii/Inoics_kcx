cordova.define("cordova-plugin-sqloperate.mSqlOperate", function(require, exports, module) {
    var exec = require('cordova/exec');
    module.exports = {
        /**
         *
           exec方法一共5个参数:
           第一个 :成功回调
           第二个 :失败回调
           第三个 :将要调用的对象名(在config.xml中配置,对应于feature的name属性，value就是本地实现的java类)
           第四个 :调用的方法名(java类中通过action识别方法名)
           第五个 :传递的参数（json格式）
         */
        SqlOperate: function(action,obj,success,error) {
            var arr = [];
            cordova.exec(
            function(result){
                    //成功后的回调，这里仅仅弹出了返回参数。
                success(result);
            },
            function(err) {
               //失败后的回调，可以弹出失败原因。
               error(err);
            },
            "SqlOperate",action,[obj]);
        }
    };
});
