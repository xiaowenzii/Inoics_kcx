package com.xiaowenzi.idcard;

import android.content.Context;

import java.io.File;

public class DataFileUtil {
    public static File getSaveFile(Context context) {
        return new File(context.getFilesDir(), "pic.jpg");
    }
}
