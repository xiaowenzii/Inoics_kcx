package com.xiaowenzi.db;

/**
 * created by jingwen.li
 * 2019/2/27
 */
public class Student {
    public static String _TABLTE_STUDENT_NAME = "table_student";

    public static String _ID = "_id";
    public static String _DATA = "_data";
    public static String _FIRSTCLASS = "_firstClass";
    public static String _SECONDCLASS = "_secondClass";
    public static String _THREECLASS = "_threeClass";
    public static String _FOURCLASS = "_fourClass";
    public static String _FIVECLASS = "_fiveCalss";

    private String data;
    private String firstClass;
    private String secondClass;
    private String threeClass;
    private String fourClass;
    private String fiveCalss;

    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
    public String getFirstClass() {
        return firstClass;
    }
    public void setFirstClass(String firstClass) {
        this.firstClass = firstClass;
    }
    public String getSecondClass() {
        return secondClass;
    }
    public void setSecondClass(String secondClass) {
        this.secondClass = secondClass;
    }
    public String getThreeClass() {
        return threeClass;
    }
    public void setThreeClass(String threeClass) {
        this.threeClass = threeClass;
    }
    public String getFourClass() {
        return fourClass;
    }
    public void setFourClass(String fourClass) {
        this.fourClass = fourClass;
    }
    public String getFiveCalss() {
        return fiveCalss;
    }
    public void setFiveCalss(String fiveCalss) {
        this.fiveCalss = fiveCalss;
    }

}
