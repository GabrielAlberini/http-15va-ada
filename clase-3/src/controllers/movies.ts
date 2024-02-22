// --------------- Controlar la requert y los datos ----------------
// --------------- Derivar la request al modelo ----------------
// --------------- Responderle al usuario ----------------

import { Request, Response } from "express";
import MoviesModel from "../models/models";
import crypto from "node:crypto";

abstract class MoviesController {
  static getAll = (req: Request, res: Response) => {
    const movies = MoviesModel.getAll();
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
    res.json(newMovie);
  };
}

export default MoviesController;
