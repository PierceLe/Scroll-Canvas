FROM gradle:8.10-jdk17-graal
LABEL maintainer="Pierce Le <hale0087@uni.sydney.edu.au>"
WORKDIR /app
COPY . .
RUN gradle build
EXPOSE 8080
CMD gradle clean test && gradle run