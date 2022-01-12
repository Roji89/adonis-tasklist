install :
npm init adonis-ts-app auth
or
npx create-adonis-ts-app adonis-taskList

server start:
node ace serve --watch

create controller:
node ace make:controller HomeController

npm i  @adonisjs/lucid@alpha
create db:
node ace invoke @adonisjs/lucid

node ace make:model Todo
node ace make:migration Todos


npm i @adonisjs/auth@alpha
node ace invoke @adonisjs/auth

node ace make:migration tasks
node ace migration:run

protection from attack:
npm install @adonisjs/shield@alpha
node ace invoke @adonisjs/shield