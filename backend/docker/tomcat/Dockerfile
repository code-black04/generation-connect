FROM tomcat:10.0-jdk17-openjdk-slim
COPY ./gc-api.jar /app/gc-api.jar
RUN chmod -R 777 /app/gc-api.jar
WORKDIR /java/jdk/bin
CMD echo Starting Docker Container
EXPOSE 8080/tcp
VOLUME /data
ENTRYPOINT ["java","-jar","/app/gc-api.jar"]