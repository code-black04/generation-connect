mvn clean

cd docker/postgres || exit
docker stop gc-postgres-db
docker rm gc-postgres-db
docker images
docker rmi -f gc-postgres-db-image

docker stop gc-neo4j-db
docker rm gc-neo4j-db
docker images
docker rmi -f gc-neo4j-db-image

cd ../..
cd docker/tomcat || exit
docker stop gc-api
docker rm gc-api
docker images
docker rmi -f gc-api-image

cd ../..
cd docker/nginx || exit
docker stop gc-nginx
docker rm gc-nginx
docker images
docker rmi -f gc-nginx-image

#docker volume rm gc_postgres_db_data_volume
#docker volume rm $(docker volume ls -q)
