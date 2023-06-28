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

# The two run scripts

To match the pair of Dockerfiles above are corresponding dev and prod batch
scripts. Simply run either of these to build and launch an ephemeral container
running your project. As outlined above, use dev when you're working, prod
when you're building/deploying, obviously

# Editing the scripts

When you start a new project and copy these files in, the only details that
should to be updated are the `PROJECT_NAME` variables in both scripts. This
value will be what your resulting container images are tagged as

# Using different git branches

The smarter thing to do when setting up a new project would be to set up
separate `dev` and `prod` branches in the repository and only check in the
appropriate Dockerfile and run script to each branch. This would eliminate the
dev/prod naming conventions and let the tools run as they were designed.
Running things this way is left as an exercise for the reader (don't forget to
also update the batch scripts' `DOCKERFILE` variable). For now I need to get
back to studying