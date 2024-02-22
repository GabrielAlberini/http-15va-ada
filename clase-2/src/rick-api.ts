import express from "express";

const PORT = process.env.PORT || 3005;

const app = express();

// ---------------- GET ------------------

app.get("/api", (req, res) => {
  res.json({
    characters: "/character",
    episodes: "/episode",
  });
});

app.get("/api/character", async (req, res) => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  const characters = data.results;

  const mappedCharacters = characters.map((character: any) => {
    const { id, name, species, gender } = character;
    return {
      id,
      name,
      species,
      gender,
    };
  });

  res.json(mappedCharacters);
});

app.get("/api/episode", async (req, res) => {
  const response = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await response.json();

  const episodes = data.results;

  const mappedEpisodes = episodes.map((episode: any) => {
    const { id, name, url } = episode;

    return {
      id,
      name,
      url,
    };
  });

  res.status(200).json(mappedEpisodes);
});

// ------------ PARAMETROS ----------------

app.get("/api/character/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);

  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  const characters = data.results;

  const character = characters.find(
    (character: any) => character.id === Number(id)
  );
  res.json(character);
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "404 - Resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
