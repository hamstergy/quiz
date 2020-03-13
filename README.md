# quiz project

A Quiz project, Using Sequelize.js and SQLite in an Express.js App. Use Vue.js, Node.js, Express.js and sequelize.js in combination with a SQLite database.

## Usage

1) Clone repo

```sh
git clone https://github.com/hamstergy/quiz.git
```

2) install dependencies (Built with Node.js version 8.10)

```sh
cd quiz/
npm install
```

3) run migrations and seeders

```sh
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all
```

4) start express server

```sh
npm start
```
