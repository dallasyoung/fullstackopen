set PROJECT_NAME=fullstackopen-part1
set DOCKERFILE=Dockerfile.prod

docker build -f %DOCKERFILE% -t %PROJECT_NAME% . && docker run --rm -it -p 3000:3000 %PROJECT_NAME%