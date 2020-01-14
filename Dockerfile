# Pull base image
From tomcat:8-jre8

# Maintainer
MAINTAINER "ssalimath7@gmail.com"

# Copy to images tomcat path
ADD weather-app.war /usr/local/tomcat/webapps/