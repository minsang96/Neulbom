import os
import shutil
from flask import Flask, request, jsonify
import sys
sys.path.append('/app/yolov3')

from food_classification import detect

app = Flask(__name__) 

@app.route('/cf', methods=['GET','POST'])
def post():
    if request.method == 'POST':
        user_img = request.files['user_img']
        user_seq = request.form.get('user_seq')
        user_img_path = '/app/images/'+str(user_seq)

        if not os.path.exists(user_img_path):
            os.makedirs(user_img_path)
        user_img.save('/app/images/'+str(user_seq)+'/'+str(user_img.filename))
        d = detect(user_img,user_seq)
        print(d)
        shutil.rmtree(user_img_path)
        return jsonify({'message': 'success', 'path': user_img_path, 'code': d})

if __name__ == '__main__':
    app.run()

