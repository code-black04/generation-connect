docker stop gc-app
docker rm gc-app
docker images
docker rmi -f gc-app-image
docker volume rm gc_node_modules
