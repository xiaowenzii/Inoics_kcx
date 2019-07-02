package com.xiaowenzi.db;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.xiaowenzi.app.SqlApp;

public class DBHelper extends SQLiteOpenHelper {

	 // 数据库名
    public static final String DB_NAME = "nwoms.db";
    // 数据库版
    public static final int VERSION = 1;
	
	public DBHelper(Context context) {
		super(context, DB_NAME, null, VERSION);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		createTableForStudent(db);
	}
	
	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		 db.execSQL("DROP TABLE IF EXISTS " + DB_NAME);
	        onCreate(db);
	}
	
	/**
	 * 创建课程数据表
	 * @param db
	 */
	private void createTableForStudent(SQLiteDatabase db) {
		String sql = "CREATE TABLE IF NOT EXISTS "
				+ Student._TABLTE_STUDENT_NAME
				+ " ("
				+ Student._ID
				+ " INTEGER PRIMARY KEY AUTOINCREMENT," // 自增
				+ Student._DATA + " VARCHAR,"
				+ Student._FIRSTCLASS + " VARCHAR,"
				+ Student._SECONDCLASS + " VARCHAR,"
				+ Student._THREECLASS + " VARCHAR,"
				+ Student._FOURCLASS + " VARCHAR,"
				+ Student._FIVECLASS + " VARCHAR" + ")";
		db.execSQL(sql);
	}
	
    /**
	 * 保存消息盒数
	 * @param info
     * @return 
	 */
	public void saveClass(Student info) {
		
		ContentValues values = new ContentValues();
		
		values.put(Student._DATA, info.getData());
		values.put(Student._FIRSTCLASS,info.getFirstClass());
		values.put(Student._SECONDCLASS, info.getSecondClass());
		values.put(Student._THREECLASS, info.getThreeClass());
		values.put(Student._FOURCLASS, info.getFourClass());
		values.put(Student._FIVECLASS, info.getFiveCalss());
		 
		SqlApp.getInstance().getDBHelper().getWritableDatabase().replaceOrThrow(Student._TABLTE_STUDENT_NAME, null, values);
	}

	/**
	 * 根据时间获取课程（星期几）
	 * @param day
	 * @return
	 */
	public Student getClassByDay(String day){
		
		Student Student = new Student();
	    String sql = "SELECT * FROM "+ Student._TABLTE_STUDENT_NAME +" WHERE _data =" + "'" + day + "'";
		Cursor cursor = SqlApp.getInstance().getDBHelper()
				.getWritableDatabase().rawQuery(sql, null);
		while (cursor.moveToNext()) {
			Student.setData(cursor.getString(cursor
					.getColumnIndex(Student._DATA)));
			Student.setFirstClass(cursor.getString(cursor
					.getColumnIndex(Student._FIRSTCLASS)));
			Student.setSecondClass(cursor.getString(cursor
					.getColumnIndex(Student._SECONDCLASS)));
			Student.setThreeClass(cursor.getString(cursor
					.getColumnIndex(Student._THREECLASS)));
			Student.setFourClass(cursor.getString(cursor
					.getColumnIndex(Student._FOURCLASS)));
			Student.setFiveCalss(cursor.getString(cursor
					.getColumnIndex(Student._FIVECLASS)));
		}
		return Student;
	}
}
