yarn

rm -rf build

API_BASE_URL=https://erpjs-api.prod.eolerp.eu/graphql \
KEYCLOAK_BASE_URL=https://keycloak.prod.eolerp.eu/auth \
KEYCLOAK_REALM=erpjs \
URL=https://admin.prod.eolerp.eu/ \
 yarn build

cd build

touch .static

git init
git remote add dokku dokku@prod.eolerp.eu:admin
git add .
git commit -am "make it better"
git push dokku main --force

cd ..
