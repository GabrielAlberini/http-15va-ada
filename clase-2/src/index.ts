import express from "express";

const app = express();

// Middleware -> inspector de request
app.use(express.json());

// ---------------- GET ------------------

app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

app.get("/students", (req, res) => {
  res.send("Lista de alumnas");
});

app.get("/teachers", (req, res) => {
  res.send("Lista de profesores");
});

app.get("*", (req, res) => {
  res.send("Recurso no encontrado.");
});

// ---------------- POST ------------------

// Como lo resolvió express
app.post("/students", (req, res) => {
  res.send(req.body);
});

// Como funciona express por detras
// app.post("/students", (req, res) => {
//   let body = "";

//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   req.on("end", () => {
//     const student = JSON.parse(body);

//     res.send(student);
//   });
// });

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
