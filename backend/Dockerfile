FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

COPY pom.xml .
COPY src src

RUN mvn clean package -DskipTests

EXPOSE 8080
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]