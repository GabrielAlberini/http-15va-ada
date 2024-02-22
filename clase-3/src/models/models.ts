import db from "../db/movies.json";
import fs from "node:fs";

abstract class MoviesModel {
  static getAll = () => {
    return db.movies;
  };

  static getMovieById = (id: string) => {
    const movie = db.movies.find((movie: any) => movie.id == id);
    return movie;
  };

  static createMovie = (newMovie: any) => {
    db.movies.push(newMovie);
    try {
      fs.writeFileSync("./src/db/movies.json", JSON.stringify(db));
    } catch (error) {
      return new Error();
    }
    return newMovie;
  };
}

export default MoviesModel;
