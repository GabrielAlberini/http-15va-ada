import http from "node:http";
import db from "./db/ada.json";
import fs from "node:fs";

// Variable de entorno (sin archivo .env)
const PORT = process.env.PORT;

//Destructuración de data de db
const { index, students, teachers } = db;

// Un callback es una función que se ejecuta despues de que pasa algo
const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method === "GET") {
    res.setHeader("Content-type", "application/json");

    if (url === "/") {
      return res.end(JSON.stringify(index));
    }

    if (url === "/students") {
      return res.end(JSON.stringify(students));
    }

    if (url === "/teachers") {
      return res.end(JSON.stringify(teachers));
    }
  }

  if (method === "POST") {
    if (url === "/students") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const student = JSON.parse(body);
        db.students.push(student);

        fs.writeFileSync("./src/db/ada.json", JSON.stringify(db));
        res.statusCode = 201;
        return res.end(
          JSON.stringify({ status: res.statusCode, newStudent: student.nombre })
        );
      });
      return;
    }
  }

  res.statusCode = 404;
  return res.end("Not found");
});

// 65535 -> puertos diponibles en una pc
server.listen(PORT, () => {
  console.log(`Servidor en escucha por el puerto http://localhost:${PORT}`);
});
