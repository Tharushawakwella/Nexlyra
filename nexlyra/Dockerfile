# 1. Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests

# 2. Run Stage (අපි මෙතන නම වෙනස් කළා)
FROM eclipse-temurin:21-jdk
COPY --from=build /target/nexlyra-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]