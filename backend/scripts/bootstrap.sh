mvn clean
mvn install -DskipTests
cd docker/tomcat/ || exit
rm -R gc-api.jar

cd ../../
cp target/gc-api.jar docker/tomcat/
cd docker/postgres || exit
echo $PWD
docker build -t gc-postgres-db-image -f Dockerfile .

cd ../../
cd docker/neo4j || exit
echo $PWD
docker build -t gc-neo4j-db-image -f Dockerfile .

cd ../../
echo $PWD
cd docker/tomcat || exit
docker build -t gc-api-image -f Dockerfile .

cd ../../
echo $PWD
cd docker/nginx || exit
docker build -t gc-nginx-image -f Dockerfile .
