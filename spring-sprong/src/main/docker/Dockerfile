FROM java
EXPOSE 8080

ADD ${project.build.finalName}.jar /code/
ADD run.sh /

RUN chmod +x /run.sh

ENV SPRING_SPRONG_SPRUNG=""

ENTRYPOINT ["/run.sh"]

CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/code/${project.build.finalName}.jar"]