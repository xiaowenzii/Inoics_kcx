package com.xiaowenzi.idcard;

import android.app.Activity;
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
import com.xiaowenzi.app.SqlApp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.File;

/**
 * created by jingwen.li
 * 2019/2/27
 */
public class IdcardPlugin extends CordovaPlugin {

    private static final int REQUEST_CODE_CAMERA = 102;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        initAccessTokenWithAkSk(action);
        return true;
    }

    private void initAccessTokenWithAkSk(String side) {
        OCR.getInstance().initAccessTokenWithAkSk(new OnResultListener<AccessToken>() {
            @Override
            public void onResult(AccessToken accessToken) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        if (side.equals(IDCardParams.ID_CARD_SIDE_FRONT)) {
                            Intent intent = new Intent(SqlApp.getInstance(), CameraActivity.class);
                            intent.putExtra(CameraActivity.KEY_OUTPUT_FILE_PATH,
                                    DataFileUtil.getSaveFile(SqlApp.getInstance()).getAbsolutePath());
                            intent.putExtra(CameraActivity.KEY_CONTENT_TYPE, CameraActivity.CONTENT_TYPE_ID_CARD_FRONT);
                            cordova.startActivityForResult(CordovaPlugin.getInstance(), intent, REQUEST_CODE_CAMERA);
                        } else {
                            Intent intent = new Intent(SqlApp.getInstance(), CameraActivity.class);
                            intent.putExtra(CameraActivity.KEY_OUTPUT_FILE_PATH,
                                    DataFileUtil.getSaveFile(SqlApp.getInstance()).getAbsolutePath());
                            intent.putExtra(CameraActivity.KEY_CONTENT_TYPE, CameraActivity.CONTENT_TYPE_ID_CARD_BACK);
                            cordova.startActivityForResult(CordovaPlugin.getInstance(), intent, REQUEST_CODE_CAMERA);
                        }
                    }
                });
            }

            @Override
            public void onError(OCRError ocrError) {
                ocrError.printStackTrace();
                HBaseApp.post2UIRunnable(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(SqlApp.getInstance(), "初始化认证失败,请检查 key", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        }, SqlApp.getInstance(), "dfoi5inVLZ6KYrG36LdhyZ2O", "tXgIAkY7s2CaMPEaEIcUfaQs86yNTGcQ");
    }

    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == REQUEST_CODE_CAMERA && resultCode == Activity.RESULT_OK) {
            if (intent != null) {
                String contentType = intent.getStringExtra(CameraActivity.KEY_CONTENT_TYPE);
                String filePath = DataFileUtil.getSaveFile(SqlApp.getInstance()).getAbsolutePath();
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
                    if (idCardSide.equals(IDCardParams.ID_CARD_SIDE_BACK)) {
                        if (idCardResult.getSignDate() != null) {
                            Log.e("发证日期", idCardResult.getSignDate().toString());
                        }
                        if (idCardResult.getExpiryDate() != null) {
                            Log.e("到期日期", idCardResult.getExpiryDate().toString());
                        }
                        if (idCardResult.getIssueAuthority() != null) {
                            Log.e("签发机关", idCardResult.getIssueAuthority().toString());
                        }
                    } else {
                        if (idCardResult.getName() != null) {
                            Log.e("姓名", idCardResult.getName().toString());
                        }
                        if (idCardResult.getGender() != null) {
                            Log.e("性别", idCardResult.getGender().toString());
                        }
                        if (idCardResult.getEthnic() != null) {
                            Log.e("民族", idCardResult.getEthnic().toString());
                        }
                        if (idCardResult.getIdNumber() != null) {
                            Log.e("身份证号", idCardResult.getIdNumber().toString());
                        }
                        if (idCardResult.getAddress() != null) {
                            Log.e("家庭住址", idCardResult.getAddress().toString());
                        }
                    }
                }
            }

            @Override
            public void onError(OCRError ocrError) {
                Log.e("", "识别错误");
            }
        });
    }
}
