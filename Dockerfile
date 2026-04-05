
FROM eclipse-temurin:21-jre
WORKDIR /app

ARG DB_URL
ARG DB_USER
ARG DB_PASSWORD

ENV DB_URL=$DB_URL
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD

COPY target/flappy-bird-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
