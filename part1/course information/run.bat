set PROJECT_NAME=fullstackopen-part1-courseinfo
set DOCKERFILE=Dockerfile

docker build -f %DOCKERFILE% -t %PROJECT_NAME% . && docker run --rm -it -p 3000:3000 %PROJECT_NAME%