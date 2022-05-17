# 음식 분류 모델 적용 방법

## 1. Google Drive에서 음식 분류 모델 다운로드

https://drive.google.com/file/d/1N6RVNf_bqyC--J5Xop1jqeiPMm83T6tz/view?usp=sharing

<br>

## 2. yolov3.zip을 압축 해제한 뒤 서버의 /home/ubuntu에 위치시킨다.

<br>

# 음식 양 추정 모델 적용 방법

## 1. Google Drive에서 음식 양 추정 모델 다운로드

https://drive.google.com/file/d/1IISjzjM08sXsdFycaWuVJ3Tqzu_6ChHR/view?usp=sharing

<br>

## 2. quantity_est.zip을 압축 해제한 뒤 서버의 /home/ubuntu에 위치시킨다.

<br>

# 서버 실행

## 1. Docker Image 생성

```
docker build -t neulbom/flask neulbomAI
```

<br>

## 2. Docker Container 실행

```
docker run -d --name flask -p 5000:5000 -e TZ=Asia/Seoul -v /home/ubuntu/yolov3:/app/yolov3 -v /home/ubuntu/quantity_est:/app/quantity_est neulbom/flask
```
