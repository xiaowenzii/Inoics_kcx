//var socketAddress = 'http://10.234.16.29:3000/';
//var socketAddress = 'http://171.34.73.182:7000/';
//var socketAddress = 'http://127.0.0.1:13000/';
var socketAddress = 'http://192.168.14.47:7000/';
function ThPush(e){
  this.socketAddress = socketAddress;
  this.appkey = e.appkey;
  this.bizid = e.bizid;
  this.socket_connected = false;
  this.auto_reconnect = false;
}
var MSG_SUB_FAIL = '订阅失败';
var MSG_UNSUB_FAIL = '取消订阅操作失败';
var MSG_MISSING_MESSAGE = 'Missing Message';
var __log = function(msg) {
    if (typeof console != "undefined" && typeof console.log != "undefined") {
        console.log(msg);
    }
};
var __error = function (msg) {
    __log(msg);
    return false;
};
var __MessageIdUtil = {
	    get: function () {
	        var randomness = Math.round(Math.random() * 1e16) % Math.pow(2, 23);
	        if (randomness.toString(2).length > 23) {
	            randomness = (randomness >>> (randomness.toString(2).length - 23)).toString(2);
	        } else {
	            randomness = (randomness << (23 - randomness.toString(2).length)).toString(2);
	        }
	        var timestamp = (new Date().getTime()).toString(2);
	        return parseInt(timestamp, 2).toString() + parseInt(randomness, 2).toString();
	    }
	};
ThPush.prototype._validate_topic = function (topic, callback) {
    if (!topic) {
        return __error(MSG_MISSING_CHANNEL) && callback(false, MSG_MISSING_CHANNEL);
    } else if (topic.length > 50 || !/^([a-zA-Z0-9_\/#\+]*)$/.test(topic)) {
        return __error(MSG_ERROR_CHANNEL) && callback(false, MSG_ERROR_CHANNEL);
    }
    return true;
};
ThPush.prototype._validate_customid = function (alias, callback) {
    if (!alias) {
        return __error(MSG_MISSING_ALIAS) && callback(false, MSG_MISSING_ALIAS);
    } else if (alias.length > 50 || !/^([a-zA-Z0-9_]*)$/.test(alias)) {
        return __error(MSG_ERROR_ALIAS) && callback(false, MSG_ERROR_ALIAS);
    }
    return true;
};
ThPush.prototype._validate_message = function (message, callback) {
    if (!message) {
        return __error(MSG_MISSING_MESSAGE) && callback(false, MSG_MISSING_MESSAGE);
    }
    return true;
};
ThPush.prototype.init = function(init_callback, rec_callback){
	var me = this;
	init_callback = init_callback || function () {};
	rec_callback = rec_callback || function () {};
	me.message_cb = function () {};
	me.suback_cb = {};
	me.puback_cb = {};
	me.unsuback_cb = {};
    me.get_state_cb = function () {};
    me.get_state_cb2 = {};
    me.get_topic_list_cb = function () {};
    me.get_topic_list_cb2 = {};
    me.get_presence_topic_list_cb = function () {};
    me.get_presence_topic_list_cb2 = {};
    me.get_customid_list_cb = function () {};
    me.get_customid_list_cb2 = {};
	var socketio_connect = function () {
		try {
            __log('js client start init...');
            me.socket = io.connect(me.socketAddress);  
            me.socket.on('connect', function () {
                __log('js client init success.');
                me.socket_connected = true;
                init_callback(true);
            });
            me.socket.on('error', function (e) {
                if (me.auto_reconnect) {
                    setTimeout(function () {
                        socketio_connect();
                    }, 1000);
                } else {
                    __log('js client init error:', e);
                    me.socket_connected = false;
                    init_callback(false);
                }
            });
            me.socket.on('disconnect', function () {
                if (me.auto_reconnect) {
                    setTimeout(function () {
                        socketio_connect();
                    }, 1000);
                } else {
                    __log('js client disconnect.');
                    me.socket_connected = false;
                    init_callback(false);
                }
            });
            me.socket.on('connack', function (result) {
                if (result.success) {
                    if (me.connack_cb)
                        me.connack_cb(true, null, result.sessionid);
                } 
            });
            me.socket.on('suback', function (result) {
                if (result.success) {
                    me.suback_cb[result.messageId](true);
                } else {
                    me.suback_cb[result.messageId](false, MSG_SUB_FAIL);
                    return __error(MSG_SUB_FAIL);
                }
            });
            me.socket.on('unsuback', function (result) {
                if (result.success) {
                    me.unsuback_cb[result.messageId](true);
                } else {
                    me.unsuback_cb[result.messageId](false, MSG_UNSUB_FAIL);
                    return __error(MSG_UNSUB_FAIL);
                }
            });
            me.socket.on('puback', function (result) {
                if (result.success) {
                    me.puback_cb[result.messageId](true);
                } else {
                    me.puback_cb[result.messageId](false, MSG_SUB_FAIL);
                    return __error(MSG_SUB_FAIL);
                }
            });
            me.socket.on('message', function (data) {
                me.message_cb(data);
            });
            me.socket.on('get_state_ack', function (ack) {
            	 if (ack.success) {
                     me.get_state_cb2[ack.customid]({
                         success: true,
                         status: ack.status
                     });
                 } else {
                     me.get_state_cb({
                         success: false,
                         error_msg: ack.error_msg
                     });
                 }
            });
            me.socket.on('get_topic_list_ack', function (ack) {
                if (ack.success) {
                    if (me.get_topic_list_cb2[ack.customid]) {
                        me.get_topic_list_cb2[ack.customid](true, {
                            topics: ack.topics
                        });
                    } else {
                        me.get_topic_list_cb(true, {
                            topics: ack.topics
                        });
                    }
                } else {
                    me.get_topic_list_cb(false, {
                        error_msg: ack.error_msg
                    });
                }
            });
            me.socket.on('get_presence_topic_list_ack', function (ack) {
                if (ack.success) {
                    if (me.get_presence_topic_list_cb2[ack.customid]) {
                        me.get_presence_topic_list_cb2[ack.customid](true, {
                            topics: ack.topics
                        });
                    } else {
                        me.get_presence_topic_list_cb(true, {
                            topics: ack.topics
                        });
                    }
                } else {
                    me.get_presence_topic_list_cb(false, {
                        error_msg: ack.error_msg
                    });
                }
            });
            me.socket.on('get_customid_list_ack', function (ack) {
                if (ack.success) {
                    if (me.get_customid_list_cb2[ack.topic]) {
                        me.get_customid_list_cb2[ack.topic](true, {
                        	customids: ack.customids
                        });
                    } else {
                        me.get_customid_list_cb(true, {
                        	customids: ack.customids
                        });
                    }
                } else {
                    me.get_customid_list_cb(false, {
                        error_msg: ack.error_msg
                    });
                }
            });
		} catch (err) {
			 if (me.auto_reconnect) {
                 setTimeout(function () {
                     socketio_connect();
                 }, 1000);
             } else {
                 return __error(MSG_CONNECT_FAIL) && init_callback(false, MSG_CONNECT_FAIL);
             }
		}
	};
	socketio_connect();
};
ThPush.prototype.connect_by_customid = function(customid, callback){
	if (this.socket_connected === false) {
	    return false;
	}
    if (!this._validate_customid(customid, callback)) {
        return false;
    }
	this.connack_cb = callback;
	try {
	    this.socket.emit('login', {appkey: this.appkey, customid: customid, bizid:this.bizid});
	} catch (err) {
	    return __error(err) && callback(false, err);
	}
};
ThPush.prototype.subscribe = function(args, callback){
    if (this.socket_connected === false) {
        return false;
    }
    var topic = args['topic'];
    var msgId = args['messageId'] || __MessageIdUtil.get();
    this.suback_cb[msgId.toString()] = args['callback'] || callback || function () {
    };
    if (!this._validate_topic(topic, callback)) {
        return false;
    }
    try {
        this.socket.emit('subscribe', {'topic': topic, 'messageId': msgId});
    } catch (err) {
        return __error(err) && callback(false, err);
    }
};
ThPush.prototype.subscribe_presence = function(args, callback){
    if (this.socket_connected === false) {
        return false;
    }
    var topic = args['topic'];
    var msgId = args['messageId'] || __MessageIdUtil.get();
    this.suback_cb[msgId.toString()] = args['callback'] || callback || function () {
    };
    if (!this._validate_topic(topic, callback)) {
        return false;
    }
    try {
        this.socket.emit('subscribe', {'topic': topic + '/p', 'messageId': msgId});
    } catch (err) {
        return __error(err) && callback(false, err);
    }
};
ThPush.prototype.publish = function (args, callback) {
	 if (this.socket_connected === false) {
         return false;
     }
     var topic = args['topic'] || args['channel'];
     var msg = args['msg'];
     var bizid = args['bizid'];
     var msgId = args['messageId'] || __MessageIdUtil.get();
     this.puback_cb[msgId.toString()] = callback;

     var callback = args['callback'] || callback || function () {
         };

     if (!this._validate_topic(topic, callback)) {
         return false;
     } else if (!this._validate_message(msg, callback)) {
         return false;
     }
     try {
         this.socket.emit('publish', {'topic': topic, 'msg': msg, 'messageId': msgId, 'bizid': bizid});
     } catch (err) {
         return __error(err) && callback(false, err);
     }
};
ThPush.prototype.set_message_cb = function (cb) {
    this.message_cb = cb;
};
ThPush.prototype.unsubscribe = function (args, callback) {
    if (this.socket_connected === false) {
        return false;
    }
    var topic = args['topic'];
    var msgId = args['messageId'] || __MessageIdUtil.get();
    this.unsuback_cb[msgId.toString()] = args['callback'] || callback || function () {
        };

    if (!this._validate_topic(topic, callback)) {
        return false;
    }

    try {
        this.socket.emit('unsubscribe', {'topic': topic, 'messageId': msgId});
    } catch (err) {
        return __error(err) && callback(false, err);
    }
};
ThPush.prototype.unsubscribe_presence = function (args, callback) {
    if (this.socket_connected === false) {
        return false;
    }
    var topic = args['topic'];
    var msgId = args['messageId'] || __MessageIdUtil.get();
    this.unsuback_cb[msgId.toString()] = args['callback'] || callback || function () {
        };

    if (!this._validate_topic(topic, callback)) {
        return false;
    }

    try {
        this.socket.emit('unsubscribe', {'topic': topic + '/p', 'messageId': msgId});
    } catch (err) {
        return __error(err) && callback(false, err);
    }
};
ThPush.prototype.publish_to_customid = function (args, callback) {
    if (this.socket_connected === false) {
        return false;
    }
    var customid = args['customid'];
    var bizid = args['bizid'];
    var msg = args['msg'];
    var time_to_live = args['time_to_live'];
    var messageId = args['messageId'] || __MessageIdUtil.get();
    this.puback_cb[messageId.toString()] = callback;

    var callback = args['callback'] || callback || function () {
        };

    if (!this._validate_customid(customid, callback)) {
        return false;
    } else if (!this._validate_message(msg, callback)) {
        return false;
    }

    try {
        this.socket.emit('publish_to_customid', {'customid': customid, 'msg': msg, 'messageId': messageId, 'bizid': bizid,'time_to_live':time_to_live});
    } catch (err) {
        return __error(err) && callback(false, err);
    }
};
ThPush.prototype.get_state = function (customid, callback) {
    if (customid) {
        this.get_state_cb2[customid] = callback || function () {};
    }
    this.get_state_cb = callback || function () {};
    this.socket.emit('get_state', {'customid': customid});
};
ThPush.prototype.get_topic_list = function (customid, callback) {
    if (customid) {
        this.get_topic_list_cb2[customid] = callback || function () {};
    }
    this.get_topic_list_cb = callback || function () {};
    this.socket.emit('get_topic_list', {'customid': customid});
};
ThPush.prototype.get_presence_topic_list = function (customid, callback) {
    if (customid) {
        this.get_presence_topic_list_cb2[customid] = callback || function () {};
    }
    this.get_presence_topic_list_cb = callback || function () {};
    this.socket.emit('get_presence_topic_list', {'customid': customid});
};
ThPush.prototype.get_customid_list = function (topic, callback) {
    if (topic) {
        this.get_customid_list_cb2[topic] = callback || function () {
            };
    }
    this.get_customid_list_cb = callback || function () {
        };
    this.socket.emit('get_customid_list', {'topic': topic});
};
ThPush.prototype.disconnect = function () {
	if(this.socket){
		this.socket.disconnect();
	}
};