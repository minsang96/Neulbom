import os
import shutil
from flask import Flask, request, jsonify
import sys
sys.path.append('/app/yolov3')

from seperate import detect, initModel

sys.path.append('/app/quantity_est')
from food_quantity import quantity, initQuantityModel

app = Flask(__name__)

# 음식 인식, 양 추정 모델 초기화
# 처음 한 번만 실행되도록 - 메모리
classificationModel = initModel()
quantityModel, class_to_idx = initQuantityModel("/app/quantity_est/weights/new_opencv_ckpt_b84_e200.pth")

print("Server start")

@app.route('/cf', methods=['GET','POST'])
def post():
    if request.method == 'POST':
        user_img = request.files['user_img']
        name, ext = os.path.splitext(str(user_img.filename))
        
        #if ext!='.jpg' or ext!='.JPG':
        #    return jsonify({'status': 'fail', 'message' : 'jpg파일만 업로드 가능합니다.', 'code' : '00000000', 'quantity' : '0'})
        user_seq = request.form.get('user_seq')
        user_img_path = '/app/images/'+str(user_seq)

        # 사진 저장
        if not os.path.exists(user_img_path):
            os.makedirs(user_img_path)
        user_img.save('/app/images/'+str(user_seq)+'/'+str(user_img.filename))

        # 음식 종류 인식
        food_code = detect(user_img,user_seq, classificationModel)
       
        # 음식 양 추정
        food_quantity = quantity(user_seq, quantityModel, class_to_idx)
        
        # 사진 삭제
        shutil.rmtree(user_img_path)

        return jsonify({'status': 'success', 'path': user_img_path, 'code': food_code, 'quantity': food_quantity})

if __name__ == '__main__':
    app.run()