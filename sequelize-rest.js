const Sequelize = require("sequelize");
const db = new Sequelize("postgres://postgres:secret@localhost:5432/postgres");

const Movie = db.define("movies", {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

db.sync()
  .then(res => console.log("database connected"))
  .then(() => {
    Promise.all([
      Movie.create({
        title: "Joker",
        yearOfRelease: 2019,
        synopsis:
          'In Gotham City, mentally-troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: "The Joker".'
      }),
      Movie.create({
        title: "El Camino: A Breaking Bad Movie",
        yearOfRelease: 2019,
        synopsis:
          "A sequel, of sorts, to Breaking Bad following Jesse Pinkman after the events captured in the finale of Breaking Bad. Jesse is now on the run, as a massive police manhunt for him is in operation."
      }),
      Movie.create({
        title: "Gemini Man",
        yearOfRelease: 2019,
        synopsis:
          "An over-the-hill hitman faces off against a younger clone of himself."
      })
    ]);
  })
  .catch(console.error);
