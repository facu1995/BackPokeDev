const methodOverride = require("method-override");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
let { v4: uuid } = require("uuid"); //se usar para el hash
const dayjs = require("dayjs");


//mocks


const app = express();
const log = console.log;
let port = process.env.PORT || 4000;

const multerConfig = multer.diskStorage({
   destination: function (res, file, cb) {
      cb(null, "./bucket")//Donde lo vamos a ubicar
   },
   filename: function (res, file, cb) {
      let idImage = uuid().split("-")[0];
      let day = dayjs().format('DD-MM-YYYY');
      cb(null, `${day}.${idImage}.${file.originalname}`);
   }
});
const multerMiddle = multer({ storage: multerConfig })


app.use(cors()); // permite conectar con servidores distintas
app.use(methodOverride());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(port, () => {
   log("start server " + port);
});

let users = [
   { "email": "foo@foo.com", "name": "foo", "pass": "foo123" },
   { "email": "bar@bar.com", "name": "bar", "pass": "bar123" },
   { "email": "qux@qux.com", "name": "qux", "pass": "qux123" },
];

app.get("/users", (req, res) => {
   res.send(users);
});

app.get("/reset", (req, res) => {
   users = [];
});

app.get("/user/unmail/:email", (req, res) => {
   res.send(users.filter(el => el.email == req.params.email));
});

app.get("/usersEmail/:email", (req, res) => {
   let email = req.params.email;
   let arrayEmail = email.split(",");
   let resp = [];
   arrayEmail.forEach((email) => {
      users.forEach((user) => {
         if (user.email == email) {
            resp.push(user);
         }
      });
   })
   res.send(resp);
});

/* app.get("/user/name/", (req, res) => {
   res.send(users.filter(el => (el.name === req.query.name)));
}); */
app.get("/users/name", (req, res) => {
   let arrayNombre = req.query.nombre;
   let resul = [];

   arrayNombre.forEach((nombre) => {
      users.forEach(element => {
         if (nombre == element.name) {
            resul.push(element);
         }
      })
   })
   res.send(resul);
})

app.post("/user", (req, res) => {
   users.push({ email: req.body.email, name: req.body.nombre, pass: req.body.pass });
   res.send("usuario creado");
});

app.delete("/user/borrarUno/:email", (req, res) => {
   users = users.filter(el => el.email != req.params.email);
   res.send("usuario borrado");
});

app.delete("/user/borrarVarios/", (req, res) => {
   let arrayEmail = req.query.email;
   arrayEmail.forEach(email => {
      users = users.filter((elemento) => elemento.email != email);
   });
   res.send("Se eliminaron todos los usuarios con ese mail");
});

app.put("/user/cambiar/", (req, res) => {
   users = forEach((user, i) => {
      if (user.email == req.body.email) {
         users[i].email = req.body.nuevoEmail;
      }
   })
   res.send("usuario ha sido modificado");
})

app.post("/registro/usuario", multerMiddle.single("imagefile"), (req, res) => {
   if (req.file) {
      const { name, email, pass } = req.body;
      const foto = req.file;
      users.push({ email, name, pass, foto });
      res.send("Imagen guardada....");
   }
   else
      res.send("Error en imagen");
});


