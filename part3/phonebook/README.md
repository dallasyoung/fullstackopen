# Part 2 exercise - The Phonebook

## See the exercise descriptions

  - [2.6 - 2.10](https://fullstackopen.com/en/part2/rendering_a_collection_modules#exercises-2-1-2-5)
  - [2.11](https://fullstackopen.com/en/part2/getting_data_from_server#exercise-2-11)
  - [2.12 - 2.15](https://fullstackopen.com/en/part2/altering_data_in_server#exercises-2-12-2-15)
  - [2.16 - 2.17](https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-16-2-17)

## Running the code

This exercise has been published as a container to [Docker Hub](https://hub.docker.com/r/milquetoast/fullstackopen-part2-phonebook)
and can be run with the following command:

```
docker run -d -p 8080:3000 milquetoast/fullstackopen-part2-phonebook
```

Then connect to `http://localhost:8080` in a web browser

However, since this project relies on an external REST/DB server, simply
running this image won't result in a functional app. You're much better off
cloning the soure repository below and using `docker compose` to greatly
simplify your setup. This will also pull and spin up a [mock JSON server](https://hub.docker.com/r/clue/json-server)
that will allow the app to function properly. Otherwise, you're stuck setting
this up on your own

```
git clone https://github.com/dallasyoung/fullstackopen
cd fullstackopen/part2/phonebook
docker compose up -d
```

## Source code 

Available on [Github](https://github.com/dallasyoung/fullstackopen)