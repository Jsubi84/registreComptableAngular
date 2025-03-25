#Node image
FROM node:18-alpine AS build

#WORK DIRECTORI
WORKDIR /app

#COPY DOCUMENTS
COPY . /app

#INSTALL DEPENDENCIES
RUN npm install

#COMPILE IMAGE
RUN npm run build --prod

FROM httpd:2.4

#COPY ANGULAR COMPILATION
COPY --from=build /app/dist/registreComptable /usr/local/apache2/htdocs
COPY .htaccess /usr/local/apache2/htdocs

#EXPOSE
EXPOSE 80

#INITAL 
CMD ["httpd-foreground"]
