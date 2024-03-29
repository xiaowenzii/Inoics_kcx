var lanxDB = function(dbname) {
	var db = openDatabase(dbname, '1.0.0', '', 2 * 1024 * 1024);
	return {
		//返回数据库名
		getDBName: function() {
			return dbname;
		},
		//初始化数据库，如果需要则创建表
		init: function(tableName, colums) {
			this.switchTable(tableName);
			colums.length > 0 ? this.createTable(colums) : '';
			return this;
		},
		//创建表，colums:[name:字段名,type:字段类型]
		createTable: function(colums) {
			var sql = "CREATE TABLE IF NOT EXISTS " + this._table;
			var t;
			if (colums instanceof Array && colums.length > 0) {
				t = [];
				for (var i in colums) {
					t.push(colums[i].name + ' ' + colums[i].type);
				}
				t = t.join(', ');
			} else if (typeof colums == "object") {
				t += colums.name + ' ' + colums.type;
			}
			sql = sql + " (" + t + ")";
			var that = this;
			db.transaction(function(t) {
				t.executeSql(sql);
			})
		},
		//切换表
		switchTable: function(tableName) {
			this._table = tableName;
			this._where = '';
			return this;
		},
		//插入数据并执行回调函数，支持批量插入
		//data为Array类型，每一组值均为Object类型，每一个Obejct的属性应为表的字段名，对应要保存的值
		insertData: function(data, callback) {
			var that = this;
			var sql = "INSERT INTO " + this._table;
			if (data instanceof Array && data.length > 0) {
				var cols = [],
					qs = [];
				for (var i in data[0]) {
					cols.push(i);
					qs.push('?');
				}
				sql += " (" + cols.join(',') + ") Values (" + qs.join(',') + ")";
			} else {
				return false;
			}
			var p = [],
				d = data,
				pLenth = 0,
				r = [];
			for (var i = 0, dLength = d.length; i < dLength; i++) {
				var k = [];
				for (var j in d[i]) {
					k.push(d[i][j]);
				}
				p.push(k);
			}
			var queue = function(b, result) {
				if (result) {
					r.push(result.insertId || result.rowsAffected);
				}
				if (p.length > 0) {
					db.transaction(function(t) {
						t.executeSql(sql, p.shift(), queue, that.onfail);
					})
				} else {
					if (callback) {
						callback.call(this, r);
					}
				}
			}
			queue();
		},
		_where: '',
		//where语句，支持自写和以对象属性值对的形式
		where: function(where) {
			if (typeof where === 'object') {
				var j = this.toArray(where);
				this._where = j.join(' and ');
			} else if (typeof where === 'string') {
				this._where = where;
			}
			return this;
		},
		//更新数据，data为属性值对形式
		updateData: function(data, callback) {
			var that = this;
			var sql = "Update " + this._table;
			data = this.toArray(data).join(',');
			sql += " Set " + data + " where " + this._where;
			this.doQuery(sql, callback);
		},
		//根据条件保存数据，如果存在则更新，不存在则插入数据
		saveData: function(data, callback) {
			var sql = "Select * from " + this._table + " where " + this._where;
			var that = this;
			this.doQuery(sql, function(r) {
				console.log('doQuery====>' + JSON.stringify(r));
				if (r.length > 0) {
					if (JSON.stringify(r) != '[0]') {
						that.updateData(data, callback);
					} else {
						that.insertData([data], callback);
					}
				} else {
					that.insertData([data], callback);
				}
			});
		},
		//获取数据
		getData: function(callback) {
			var that = this;
			var sql = "Select * from " + that._table;
			that._where.length > 0 ? sql += " where " + that._where : "";
			that.doQuery(sql, callback);
		},
		//查询，内部方法
		doQuery: function(sql, callback) {
			var that = this;
			var a = [];
			var bb = function(b, result) {
				if (result.rows.length) {
					for (var i = 0; i < result.rows.length; i++) {
						a.push(result.rows.item(i));
					}
				} else {
					a.push(result.rowsAffected);
				}
				if (callback) {
					callback.call(that, a);
				}
			}
			db.transaction(function(t) {
				console.log('sql===>' + sql);
				t.executeSql(sql, [], bb, that.onfail);
			})
		},
		//根据条件删除数据
		deleteData: function(callback) {
			var that = this;
			var sql = "delete from " + that._table;
			that._where.length > 0 ? sql += " where " + that._where : '';
			that.doQuery(sql, callback);
		},
		//删除表
		dropTable: function() {
			var sql = "DROP TABLE IF EXISTS " + this._table;
			this.doQuery(sql);
		},
		_error: '',
		onfail: function(t, e) {
			this._error = e.message;
			console.log('----sqlite:' + e.message);
		},
		toArray: function(obj) {
			var t = [];
			obj = obj || {};
			if (obj) {
				for (var i in obj) {
					t.push(i + "='" + obj[i] + "'");
				}
			}
			return t;
		}
	}
}
