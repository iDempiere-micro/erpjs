call yarn rimraf dist

cd clients\web\

call yarn build

mkdir ..\..\dist\

copy package.json ..\..\dist\
copy yarn.lock ..\..\dist\
xcopy static ..\..\dist\static\ /E/H
xcopy __sapper__ ..\..\dist\__sapper__\ /E/H

cd ..\..\dist

call yarn --prod

cd ..

call yarn rimraf dist\__sapper__\dev
call yarn rimraf dist\node_modules

cd dist

git init

git remote add dokku dokku@dokku.me:erpjs

git add .

git commit -am "make it better"

git push dokku master:master --force

cd ..
