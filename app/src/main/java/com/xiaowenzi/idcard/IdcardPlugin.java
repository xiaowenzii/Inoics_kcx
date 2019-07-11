package com.xiaowenzi.idcard;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.baidu.ocr.sdk.OCR;
import com.baidu.ocr.sdk.OnResultListener;
import com.baidu.ocr.sdk.exception.OCRError;
import com.baidu.ocr.sdk.model.AccessToken;
import com.baidu.ocr.sdk.model.IDCardParams;
import com.baidu.ocr.sdk.model.IDCardResult;
import com.baidu.ocr.ui.camera.CameraActivity;
import com.xiaowenzi.app.HBaseApp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PermissionHelper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;

/**
 * created by jingwen.li
 * 2019/2/27
 */
public class IdcardPlugin extends CordovaPlugin {
    public static String[] permissions = {
            Manifest.permission.CAMERA
    };
    private static final int REQUEST_CODE_CAMERA = 102;
    public CallbackContext callbackContext;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;

        if (!this.hasPermissions()) {
            PermissionHelper.requestPermissions(this, 0, IdcardPlugin.permissions);
            return true;
        } else {
            //初始化
            return initAccessTokenWithAkSk(action, args, callbackContext, (CordovaPlugin) this);
        }
    }

    private boolean initAccessTokenWithAkSk(String side, JSONArray args, CallbackContext callbackContext, CordovaPlugin cordovaPlugin) {
        OCR.getInstance().initAccessTokenWithAkSk(new OnResultListener<AccessToken>() {
            @Override
            public void onResult(AccessToken accessToken) {
                HBaseApp.post2UIRunnable(new Runnable() {
                    @Override
                    public void run() {
                        Intent intent = new Intent(cordova.getActivity(), CameraActivity.class);
                        intent.putExtra(CameraActivity.KEY_OUTPUT_FILE_PATH, DataFileUtil.getSaveFile(cordova.getActivity()).getAbsolutePath());
                        if (side.equals(IDCardParams.ID_CARD_SIDE_FRONT)) {
                            intent.putExtra(CameraActivity.KEY_CONTENT_TYPE, CameraActivity.CONTENT_TYPE_ID_CARD_FRONT);
                        } else {
                            intent.putExtra(CameraActivity.KEY_CONTENT_TYPE, CameraActivity.CONTENT_TYPE_ID_CARD_BACK);
                        }
                        cordova.startActivityForResult(cordovaPlugin, intent, REQUEST_CODE_CAMERA);
                    }
                });
            }

            @Override
            public void onError(OCRError ocrError) {
                ocrError.printStackTrace();
                HBaseApp.post2UIRunnable(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(cordova.getActivity(), "初始化认证失败,请检查 key", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        }, cordova.getActivity(), "5huvRjYS4OfG4QdfVsazqf3S", "xzNhGktP7XNRGVSP0AaVKK1saxgelp5M");

        return true;
    }

    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == REQUEST_CODE_CAMERA && resultCode == Activity.RESULT_OK) {
            if (intent != null) {
                String contentType = intent.getStringExtra(CameraActivity.KEY_CONTENT_TYPE);
                String filePath = DataFileUtil.getSaveFile(cordova.getActivity()).getAbsolutePath();
                if (!TextUtils.isEmpty(contentType)) {
                    if (CameraActivity.CONTENT_TYPE_ID_CARD_FRONT.equals(contentType)) {
                        //识别身份证头像面信息
                        recIDCard(IDCardParams.ID_CARD_SIDE_FRONT, filePath);
                    } else {
                        recIDCard(IDCardParams.ID_CARD_SIDE_BACK, filePath);
                    }
                }
            }
        }
    }

    /**
     * 解析身份证图片
     *
     * @param idCardSide 身份证正反面
     * @param filePath   图片路径
     */
    private void recIDCard(final String idCardSide, String filePath) {
        IDCardParams param = new IDCardParams();
        param.setImageFile(new File(filePath));
        // 设置身份证正反面
        param.setIdCardSide(idCardSide);
        // 设置方向检测
        param.setDetectDirection(true);
        // 设置图像参数压缩质量0-100, 越大图像质量越好但是请求时间越长。 不设置则默认值为20
        param.setImageQuality(40);

        //获取图片
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inSampleSize = 1;
        final Bitmap bitmap = BitmapFactory.decodeFile(filePath, options);

        OCR.getInstance().recognizeIDCard(param, new OnResultListener<IDCardResult>() {
            @Override
            public void onResult(IDCardResult idCardResult) {
                if (idCardResult != null) {
                    try {
                        if (idCardSide.equals(IDCardParams.ID_CARD_SIDE_BACK)) {
                            JSONObject obj = new JSONObject();
                            obj.put("signDate", idCardResult.getSignDate());
                            obj.put("expiryDate", idCardResult.getExpiryDate());
                            obj.put("issueAuthority", idCardResult.getIssueAuthority());

                            callbackContext.success(obj);
                        } else {
                            JSONObject obj = new JSONObject();
                            obj.put("name", idCardResult.getName());
                            obj.put("gender", idCardResult.getGender());
                            obj.put("ethnic", idCardResult.getEthnic());
                            obj.put("idNumber", idCardResult.getIdNumber());
                            obj.put("address", idCardResult.getAddress());

                            callbackContext.success(obj);
                        }
                    } catch (JSONException e) {
                    }
                }
            }

            @Override
            public void onError(OCRError ocrError) {
                callbackContext.error("识别错误");
                Log.e("", "识别错误");
            }
        });
    }

    public boolean hasPermissions() {
        for (String p : permissions) {
            if (!PermissionHelper.hasPermission(this, p)) {
                return false;
            }
        }
        return true;
    }
}
