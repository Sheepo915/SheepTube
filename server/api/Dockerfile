FROM golang:latest

COPY * ./app
WORKDIR /app

ENV APP_PORT "443"
ENV DB_HOST "127.0.0.1"
ENV DB_PORT "5432"
ENV DB_USER "admin"
ENV DB_PASSWORD "p@ssw0rd"
ENV DB_NAME "sheep_tube"

EXPOSE 80

RUN go build -o api.exe

CMD [ "api", "run" ]