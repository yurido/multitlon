
How to start Multitlon Server
---

1. Change to `/backend` folder  
1. Run `mvn clean install` to build server
1. Start server with `java -jar target/multitlon-server-1.0-SNAPSHOT.jar server config.yml`
1. To check that your application is running enter url `http://localhost:8080`

Health Check
---

To see your applications health enter url `http://localhost:8081/healthcheck`
