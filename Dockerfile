FROM gradle:8.10-jdk8-jammy
LABEL maintainer="Pierce Le <hale0087@uni.sydney.edu.au>"
WORKDIR /app
COPY . .
RUN gradle build
CMD gradle clean test && gradle run