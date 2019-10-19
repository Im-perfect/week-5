const Sequelize = require('sequelize')
const db = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')

const Movie = db.define("movies", {
    title: Sequelize.STRING,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.STRING
  });

db.sync()
.then(res => console.log('database connected'))
.catch(console.error)