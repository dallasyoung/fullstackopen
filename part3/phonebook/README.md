# Part 3 exercise - The Phonebook v2.0

## See the exercise descriptions

  - [3.1 - 3.6](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6)
  - [3.6 - 3.8](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-7-3-8)
  - [3.8 - 3.11](https://fullstackopen.com/en/part3/deploying_app_to_internet#exercises-3-9-3-11)17)

## Running the code

This exercise has been published as a container to [Docker Hub](https://hub.docker.com/r/milquetoast/fullstackopen-part3-phonebook)
and can be run with the following command:

```
docker run -d -p 8080:3000 milquetoast/fullstackopen-part3-phonebook
```

Then connect to `http://localhost:8080` in a web browser

However, since this project relies on an external REST/DB server, simply
running this image won't result in a functional app. Basically the entire point
of part 3 is to write our own backend in with Node.js, so this has also been
done and published to [Docker Hub](https://hub.docker.com/r/milquetoast/fullstackopen-part3-phonebook-backend)
as well. You're much better off running that Docker container instead, as it
hosts both our custom backend as well as this front end code all in one

Alternatively, you can clone this container's source repository below and use
`docker compose` to simplify your setup. This will also pull and spin up a
[mock JSON server](https://hub.docker.com/r/clue/json-server) that will allow
the app to function properly

```
git clone https://github.com/dallasyoung/fullstackopen
cd fullstackopen/part2/phonebook
docker compose up -d
```

Otherwise, you're stuck writing your own compose file to integrate this
frontend container with the backend container, or another custom backend of
your choosing

## Source code 

Available on [Github](https://github.com/dallasyoung/fullstackopen)