#node image
FROM node

RUN mkdir -p /usr/src/frontend
#set working directory
WORKDIR /usr/src/frontend

#Copy both package.json and package-lock.json
COPY package.json /usr/src/frontend

#Install dependencies
# RUN npm install --save core-js@^3

RUN npm install

#Copy everything from here to container
COPY . .

#Specify port it runs on
EXPOSE 3000

#Command to run our app
CMD ["npm", "start"]
