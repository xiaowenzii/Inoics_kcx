package com.xiaowenzi.app;

import com.xiaowenzi.db.DBHelper;

public class SqlApp extends HBaseApp{

	private DBHelper dBHelper;
	protected static SqlApp s_instance = null;
	
	public static SqlApp getInstance() {
		return (SqlApp)HBaseApp.getInstance();
	}
	
	public DBHelper getDBHelper(){
		if(this.dBHelper == null){
			// 实例化数据库
			dBHelper = new DBHelper(this);
		}
		return dBHelper;
	}
}
