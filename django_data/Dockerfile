FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
RUN mkdir /code/media
RUN mkdir /code/static
WORKDIR /code/
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/