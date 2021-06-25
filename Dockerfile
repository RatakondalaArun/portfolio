FROM node:14

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=80

COPY . .

RUN npm install --prefix server/ 

EXPOSE 80


RUN chmod +x deploy.sh

CMD [ "./deploy.sh" ]
