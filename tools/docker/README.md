## The files in this directory

This directory contains a few additional Dockerfile and batch script templates
used when learning from & working on the various parts & exercises. They're
meant to be copied to each React project root you create and should only need
minor tweaking for each different project/example

## The two Dockerfiles

Both Dockerfiles are based on the standard `node` image and run your project
files from the `/app` directory. The dev & prod files differ in that the dev
image does not contain any `COPY`d in project files - it's meant to have the
current project directory bind-mounted to `/app` so you can make live changes
to your project while developing. The prod image `COPY`s all project files to
the actual image and separately installs all needed Node dependencies like an
actual Docker project. This produces an actual image that you can push to a
container registry and use to demo your project if you want

## The run script

There used to be a pair of similar dev/prod scripts to match the pair of
Dockerfiles above. However, maintaining both of these sets throughout the
course proved to be too much hassle. The git branches and commits were a bit
convoluted, and when the course continued and we started needing different port
numbers, environment variables, NPM actions, etc to run, hacking these all in
by hand was just annoying

Now there is just a single script that uses either Dockerfile depending on
which mode you're running it in. Simply running the script with `.\run.bat`
will run the prod setup and build/run the final production image. To switch to
dev mode, where the majority of your work will be done, use `.\run.bat dev`
instead

## Editing the script

When you start a new project and copy these files in, the only detail that
**must** be updated is the `PROJECT_NAME` variable. This value will be what
your resulting container images are tagged as. Additionally there are a few
other variables you can tweak to your liking described below, though none are
required. To disable/enable an option, simply comment its line out

VARIABLE          | Description
------------------|------------
`EPHEMERAL`       | Determines whether the container that is run is automatically deleted after it is stopped
`DOCKER_PORT`     | The port that the app listens on in the actual code/container. This is `EXPOSE`d in the docker image, and your code can use this value via Node's `process.env.PORT` variable. If your code does not or can not use this value, you must manually set this by hand. If left empty, this port will default to the `HOST_PORT` defined below
`HOST_PORT`       | The port that will be mapped on your host machine. This is the one you will connect to in a web browser. If both this port and `DOCKER_PORT` above are both empty, no ports will be `EXPOSE`d in the Dockerfiles and there will be no ports published by the resulting container. If this port is left empty but `DOCKER_PORT` is defined, this is just a misconfiguration by you, and your networking will just not work
`NPM_ARGS`        | In case you define any custom scripts in your `package.json`, you can set this value to run the resulting NPM command in a container. This variable affects *Production* builds only. Defaults to `"start"` when left undefined
`NPM_ARGS_DEV`    | Exactly the same as above, but affects *Dev* builds only. Defaults to `run dev` if left undefined. **Ignored if `NPM_ARGS` is left blank** (eg. to define a custome dev command only, you still must specify `NPM_ARGS="start"` above)
`ENVIRONMENT_CFG` | Environment variables passed to the Docker container that is run by the script

## Using different git branches

With a single script for both the dev and prod builds in the same environment,
it's probably not worth running separate dev & prod branches anymore. Simply
copy in the Dockerfiles, `run.bat`, tweak how you need it, and away you go