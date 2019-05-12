FROM agavelab/nodejs:8.11.3

COPY ./api/src /var/lib/app
COPY ./core /var/lib/core
COPY ./api/scripts /home/docker/
COPY ./core/scripts/ /usr/local/bin

WORKDIR /var/lib/app

RUN npm install

EXPOSE 80

ENTRYPOINT ["/home/docker/startup.sh"]
