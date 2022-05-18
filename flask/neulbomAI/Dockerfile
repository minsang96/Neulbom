FROM python:3.8-slim

COPY . /app

RUN pip install virtualenv
CMD ["virtualenv", "venv"]
CMD ["cd","venv/Scripts"]
CMD ["activate"]
CMD ["pwd"]

RUN apt-get update
RUN pip3 install flask
RUN pip3 install flask_restx
RUN apt-get -y install libgl1-mesa-glx
RUN apt-get -y install libglib2.0-0
RUN pip3 install -r app/requirements.txt

WORKDIR /app

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
