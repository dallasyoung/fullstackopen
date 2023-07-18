set PROJECT_NAME=fullstackopen-part2-countrydata
set DOCKERFILE=Dockerfile

docker build -f %DOCKERFILE% -t %PROJECT_NAME% . && docker run --rm -it -p 3000:3000 -v .:/app %PROJECT_NAME%