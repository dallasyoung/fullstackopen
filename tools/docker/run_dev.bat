set PROJECT_NAME=fullstackopen-part1-dev
set DOCKERFILE=Dockerfile.dev

docker build -f %DOCKERFILE% -t %PROJECT_NAME% . && docker run --rm -it -p 3000:3000 -v .:/app %PROJECT_NAME%