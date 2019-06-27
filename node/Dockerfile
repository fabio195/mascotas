FROM "node:10.15.3"

RUN mkdir /mascotas

WORKDIR /mascotas

COPY . /mascotas/

RUN npm install

EXPOSE 4200

CMD [ "npm", "start" ]