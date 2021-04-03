yarn

rm -rf build

API_BASE_URL=https://erpjs-api.app.naseukoly.cz/graphql \
KEYCLOAK_BASE_URL=https://keycloak.app.naseukoly.cz/auth \
KEYCLOAK_REALM=erpjs \
URL=https://erpjs-admin.app.naseukoly.cz/ \
 yarn build

cd build

touch .static

git init
git remote add dokku dokku@app.naseukoly.cz:erpjs-admin
git add .
git commit -am "make it better"
git push dokku master:master --force

cd ..
