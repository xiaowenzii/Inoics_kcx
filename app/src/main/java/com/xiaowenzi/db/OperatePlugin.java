package com.xiaowenzi.db;

import android.util.Log;

import com.xiaowenzi.app.SqlApp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * created by jingwen.li
 * 2019/2/27
 */
public class OperatePlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("save".equals(action)) {
            saveStudent("2019-2-27", "111", "222", "333", "444", "555");
        }else if("search".equals(action)){
            Student c = searchStudetn("2019-2-27");
            Log.e("-----", c.getData()+"-"+c.getFirstClass()+"-"+c.getSecondClass());
        }
        return true;
    }


    private void saveStudent(String time, String fir, String sec, String thr, String fou, String fiv){
        Student classes = new Student();

        classes.setData(time);
        classes.setFirstClass(fir);
        classes.setSecondClass(sec);
        classes.setThreeClass(thr);
        classes.setFourClass(fou);
        classes.setFiveCalss(fiv);

        SqlApp.getInstance().getDBHelper().saveClass(classes);
    }

    private Student searchStudetn(String time){
        Student c = SqlApp.getInstance().getDBHelper().getClassByDay(time);
        return c;
    }
}
