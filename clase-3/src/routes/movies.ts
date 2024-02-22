// ------------- Declara las rutas del recurso --------------
// ------------- Deriva acción al controlador --------------

import { Router } from "express";
import MoviesController from "../controllers/movies";

const moviesRouter = Router();

// A TODAS LAS RUTAS DEL ROUTER LE ANTECEDE "api/"

// Para cada recurso una url -> movies -> para las peliculas
// El acción de tal recurso lo define el verbo HTTP

moviesRouter.get("/movies", MoviesController.getAll);
moviesRouter.get("/movies/:id", MoviesController.getMovieById);
moviesRouter.post("/movies", MoviesController.createMovie);

export default moviesRouter;
