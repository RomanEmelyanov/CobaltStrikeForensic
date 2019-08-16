docker build -t cs/dev -f Dockerfile.dev .\
docker build -t cs/trial -f Dockerfile.trial .\
docker run -p 50050:50050 -p 22:22 -p 22:22 -p 443:443 --rm -it cs/trial
