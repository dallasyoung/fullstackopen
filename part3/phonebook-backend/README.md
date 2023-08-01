# Part 3 exercise - Phonebook Backend

## See the exercise descriptions

  - [3.1 - 3.6](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6)
  - [3.6 - 3.8](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-7-3-8)
  - [3.8 - 3.11](https://fullstackopen.com/en/part3/deploying_app_to_internet#exercises-3-9-3-11)
  - [3.13 - 3.14](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-13-3-14)
  - [3.15 - 3.18](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-15-3-18)
  - [3.19 - 3.21](https://fullstackopen.com/en/part3/validation_and_es_lint#exercises-3-19-3-21)

## Running the code

This exercise has been published as a container to [Docker Hub](https://hub.docker.com/r/milquetoast/fullstackopen-part3-phonebook-backend)
and can be run with the following command:

```
docker run -d -p 8080:3001 -e MONGO_SERVER_URL="<Mongo Atlas url here>" milquetoast/fullstackopen-part3-phonebook-database
```

Then connect to `http://localhost:8080` in a web browser. Despite the container
& project's name, this container also hosts a [React frontend app](https://hub.docker.com/r/milquetoast/fullstackopen-part3-phonebook)
that will allow you to access this backend project

This project relies on a backend MongoDB server/instance that you must create
in order to store data. Read through the course material for an understanding
of how the MongoDB Atlas service is used to host the database, then create your
own cluster. To connect your own database to the backend, when you have your
own connection URL & password, edit the `ENVIRONMENT_CFG` in `run.bat` to pass
this string as an environment variable to the created Docker container

## Source code 

Available on [Github](https://github.com/dallasyoung/fullstackopen)

## Live service

Per exercise 3.10, 3.11, and 3.21, this backend has been deployed as a live service to
[render.com](https://dallasyoung-fullstackopen-part3-phonebook.onrender.com/)