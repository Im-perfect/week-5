const Sequelize = require("sequelize");
const db = new Sequelize("postgres://postgres:secret@localhost:5432/postgres");

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

//==================================DB=====================================
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

//==================================REST=====================================
app.use(bodyParser.json());

// create a new movie resource
app.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.send(movie))
    .catch(next);
});

// read all movies (the collections resource)
app.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movies => res.send(movies))
    .catch(next);
});

// read a single movie resource
app.get("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        res.status(404).end();
      } else {
        res.send(movie);
      }
    })
    .catch(next);
});

// update a single movie resource
app.put("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        res.status(404).end();
      } else {
        movie.update(req.body).then(movie => res.send(movie));
      }
    })
    .catch(next);
});

// delete a single movie resource You don't need any special logic. A standard REST implementation is ok.
app.delete("/movies/:id", (req, res, next) => {
    Movie.destroy({
      where: {
        id: req.params.id,
      }
    })
    .then(numDeleted => {
      if (numDeleted) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
  });

app.listen(port, () => console.log("Listening on port", port));
