# a simple file store by react.js and egg.js

## run front server
```
cd front
npm install
npm run dev

// will run front server in port 8090
```

## run backend server

1. `cd backend`
2. modify `app/config/config.default.js` for your database config
```
 config.sequelize = {
    dialect: 'mysql',
    username: 'root',
    password: '123456',
    database: 'rc',
    host: '127.0.0.1',
    port: 3306,
    ...
```
3. create database rc or any other name you like
4. run `npm install` install module
5. run `npm run start` to start the server.