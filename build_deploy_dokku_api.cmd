call yarn build api

cd dist

call yarn

cd ..

call yarn rimraf dist\node_modules

cd dist

git init

git remote add dokku dokku@app.naseukoly.cz:erpjs-api

git add .

git commit -am "make it better"

git push dokku master:master --force

cd ..
