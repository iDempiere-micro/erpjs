# Erp2

## Start the database

`docker stop pg-docker; docker run --rm --name pg-docker -e POSTGRES_PASSWORD=Coggel86 -e POSTGRES_DB=gt2 -d -p 5432:5432 postgres:12`

## Keyclock
- erpjs `tenant`
- erpjs `client`
allow Valid Redirect URIs: `http://localhost:5000/*`
allow Web Origins: `+`
