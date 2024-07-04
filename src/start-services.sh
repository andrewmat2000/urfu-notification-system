docker stop test-postgres
docker rm test-postgres
docker run -d --name test-postgres -e POSTGRES_USER=pguser -e POSTGRES_PASSWORD=pgpass -e POSTGRES_DB=postgres -p 5432:5432 postgres:12.2

docker stop test-ocr
docker rm test-ocr
docker run -d --label "com.ouroboros.enable=true" --name test-ocr -p 8080:8080 test-ocr
