call yarn

call yarn rimraf build

set API_BASE_URL=https://erpjs-api.app.naseukoly.cz/graphql
set KEYCLOAK_BASE_URL=https://keycloak.app.naseukoly.cz/auth
set KEYCLOAK_REALM=erpjs
set URL=https://erpjs-admin.app.naseukoly.cz/
call yarn build

cd build


type nul >>.static & copy .static +,,

git init
git remote add dokku dokku@app.naseukoly.cz:erpjs-admin
git add .
git commit -am "make it better"
git push dokku master:master --force

cd ..
