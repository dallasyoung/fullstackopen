set PROJECT_NAME=fullstackopen-part2-phonebook
set DOCKERFILE=Dockerfile

docker build -f %DOCKERFILE% -t %PROJECT_NAME% . && docker run --rm -it -p 3000:3000 %PROJECT_NAME%