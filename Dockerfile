# Node base image
FROM node:8.4.0

# Create a new user to our new container and avoid the root user
RUN useradd --user-group --create-home --shell /bin/false nupp && \
    apt-get clean

ENV HOME=/home/nupp

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY src/ $HOME/app/src

RUN chown -R nupp:nupp $HOME/* /usr/local/

WORKDIR $HOME/app

RUN npm install --silent --progress=false --production

RUN chown -R nupp:nupp $HOME/*

USER nupp

EXPOSE 3001

CMD ["npm", "start"]