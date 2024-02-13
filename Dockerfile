FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

# docker run --name ggcom-frontend -d -p 5173:5173 ggcom-frontend (1 name container 2 name image)
# docker stop ggcom-frontend (stop container)
# docker rmi ggcom_frontend (remove image)
# docker rm ggcom_frontend (remove container)

