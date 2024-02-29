// --------------- Controlar la requert y los datos ----------------
// --------------- Derivar la request al modelo ----------------
// --------------- Responderle al usuario ----------------

import { Request, Response } from "express";
import MoviesModel from "../models/movies";
import crypto from "node:crypto";
import zod from "zod";
import { validateMovie, validatePartialMovie } from "../validators/movies";

abstract class MoviesController {
  static getAll = (req: Request, res: Response) => {
    const querys = req.query;

    const movies = MoviesModel.getAll(querys);
    if (!movies) return res.status(500).json({ error: "Server Error" });
    res.json(movies);
  };

  static getMovieById = (req: Request, res: Response) => {
    const { id } = req.params;
    const movie = MoviesModel.getMovieById(id);
    if (!movie) return res.status(404).json({ error: "Not found" });
    res.json(movie);
  };

  static createMovie = (req: Request, res: Response) => {
    const responseValidator = validateMovie(req.body);

    if (!responseValidator.success) {
      return res.status(400).send(responseValidator.error);
    }

    const { name, year, director, cast, rating } = req.body;

    const id = crypto.randomUUID();

    const newMovie = {
      id,
      name,
      year,
      director,
      cast,
      rating,
    };

    const response = MoviesModel.createMovie(newMovie);
    if (response instanceof Error) {
      return res.status(500).json({ error: "Error to create movie" });
    }
    return res.json(newMovie);
  };

  static updateMovie = (req: Request, res: Response) => {
    const responseValidator = validatePartialMovie(req.body);

    if (!responseValidator.success) {
      return res.status(400).send(responseValidator.error);
    }

    const { id } = req.params;
    const { name, year, director, cast, rating } = req.body;

    const objMovie = { id, name, year, director, cast, rating };

    const response = MoviesModel.updateMovie(objMovie);

    if (!response.message) {
      res.status(400).json({ error: "Error to update movie" });
    }

    return res.json(response);
  };

  static deleteMovie = (req: Request, res: Response) => {
    const { id } = req.params;
    const response = MoviesModel.deleteMovie(id);
    if (!response.message) {
      res.status(400).json({ error: "Error to update movie" });
    }

    return res.json(response);
  };
}

export default MoviesController;
