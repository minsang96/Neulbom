FROM openjdk:8-jdk-alpine

# SpringBoot 프로젝트 경로/build/~/.jar
ARG JAR_FILE=build/libs/neulbom-0.0.1-SNAPSHOT.jar

# app.jar로 복사
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]