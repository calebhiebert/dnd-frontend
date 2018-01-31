docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli yarn
docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli ng build
docker build -t panchem/dnd-frontend .
