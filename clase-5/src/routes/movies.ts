// ------------- Declara las rutas del recurso --------------
// ------------- Deriva acción al controlador --------------

import { Router } from "express";
import MoviesController from "../controllers/movies";

const moviesRouter = Router();

//A TODAS LAS RUTAS DEL ROUTER LE ANTECEDE "api/"

// Para cada recurso una url -> movies -> para las peliculas
// El acción de tal recurso lo define el verbo HTTP

//GET
moviesRouter.get("/movies", MoviesController.getAll);
moviesRouter.get("/movies/:id", MoviesController.getMovieById);

//POST
moviesRouter.post("/movies", MoviesController.createMovie);

//PATCH
moviesRouter.patch("/movies/:id", MoviesController.updateMovie);

//DELETE
moviesRouter.delete("/movies/:id", MoviesController.deleteMovie);

export default moviesRouter;
