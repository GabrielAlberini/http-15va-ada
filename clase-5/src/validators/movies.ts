import zod from "zod";

const movieSchema = zod.object({
  name: zod.string(),
  year: zod.number().int().min(1850).max(2024),
  director: zod.string(),
  cast: zod.array(zod.string()),
  rating: zod.number().int().min(1).max(10),
});

const validateMovie = (objMovie: any) => {
  const responseValidator = movieSchema.safeParse(objMovie);
  return responseValidator;
};

const validatePartialMovie = (objMovie: any) => {
  const responseValidator = movieSchema.partial().safeParse(objMovie);
  return responseValidator;
};

export { validateMovie, validatePartialMovie };
