const methodOverride = require("method-override");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
let { v4: uuid } = require("uuid"); //se usar para el hash
const dayjs = require("dayjs");
const axios = require("axios");

//delay
const delay = require('delay');


//mocks
const { pokemonNameURL } = require('./mocks/pokemon_mocks.js');
const { movesNameURL } = require('./mocks/moves_mocks');
const { moveAllInfo } = require('./mocks/movesAllInfo_mocks');
const { pokemonAllInfo } = require('./mocks/pokemonAllInfo_mocks');
const { speciesAll } = require('./mocks/speciesAll_mocks');
const { evolvesAll } = require('./mocks/evolvesAll_mocks');
const { userData } = require('./mocks/usuarios_mocks');
//init
const { pokemonInit } = require('./initJson/pokemonInitJSON.js');
const { MoveInit } = require('./initJson/movesInitJSON.js');



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

log(pokemonNameURL.results.length, movesNameURL.results.length, moveAllInfo.length, pokemonAllInfo.length, speciesAll.length, evolvesAll.length, userData.length);


app.get("/users", (req, res) => {
   res.send(userData);
});
app.get("/user/:id", (req, res) => {
   let i = parseInt(req.params.id);
   res.send(userData[i]);
});
//endPoint Pokemon
app.get("/pokemon", (req, res) => {
   res.send(pokemonNameURL);
});
app.get("/pokemonesAll", (req, res) => {
   res.send(arrayPokemones);
});
app.get("/pokemonOne/:id", (req, res) => {
   let i = parseInt(req.params.id) - 1;
   res.send(pokemonAllInfo[i]);
});
app.get("/specieOne/:id", (req, res) => {
   let i = parseInt(req.params.id) - 1;
   res.send(speciesAll[i]);
});
app.get("/evolvesOne/:id", (req, res) => {
   let i = parseInt(req.params.id) - 1;
   res.send(evolvesAll[i]);
});
//endPoint Moves
app.get("/moves", (req, res) => {
   res.send(movesNameURL);
});

app.get("/movesAll", (req, res) => {
   res.send(arrayPokemones);
});
app.get("/movesOne/:id", (req, res) => {
   let i = parseInt(req.params.id) - 1;
   res.send(moveAllInfo[i]);
});


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

app.post("/addMove", (req, res) => {
   const [name, type, power, ] = req.body
   users.push({ id, name, power, description, type: { name: type } });
   res.send("Se agrego un move");
});



app.put("/user/cambiar/", (req, res) => {
   const { name, email, pass,id } = req.body;
   userData.forEach((user, i) => {
      if (user.email === email) {
         userData[i].name = name;
         userData[i].pass = pass;
         log("cambio un user")
      }
   })
   res.send("usuario ha sido modificado");
})

/* app.post("/registro/usuario", multerMiddle.single("imagefile"), (req, res) => {
   if (req.file) {
      const { name, email, pass } = req.body;
      const foto = req.file;
      users.push({ email, name, pass, foto });
      res.send("Imagen guardada....");
   }
   else
      res.send("Error en imagen");
}); */
app.post("/add/user", (req, res) => {
   const { name, email, pass } = req.body;
   userData.push({ email, name, pass});
   log( name, email, pass);
   res.send("Se agrego un usuario");
});


/* (async () => {
   for (let i = 1; i < 101; i++) {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + i)
         .then(function (response) {
            arrayPokemones.push(response.data);
         })
         .catch(function (error) {
            console.log(error);
         })
         .then(function () {
            // always executed
         });
      await delay(800);
   }
   console.log("termino la carga");
})(); */

/* (async () => {
   for (let i = 1; i < 201; i++) {
      axios.get("https://pokeapi.co/api/v2/pokemon-species/" + i)
         .then(function (response) {
            arrayPokemones.push(response.data);
         })
         .catch(function (error) {
            console.log(error);
         })
         .then(function () {
            // always executed
         });
      await delay(800);
   }
   console.log("termino la carga");
})();
 */

/* (async () => {
   for (let i = 1; i < 201; i++) {
      axios.get("https://pokeapi.co/api/v2/evolution-chain/" + i)
         .then(function (response) {
            arrayPokemones.push(response.data);
         })
         .catch(function (error) {
            console.log(error);
         })
         .then(function () {
            // always executed
         });
      await delay(900);
   }
   console.log("termino la carga");
})(); */




/////////////////////////
/* app.get("/user/unmail/:email", (req, res) => {
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
}); */

/* app.get("/user/name/", (req, res) => {
   res.send(users.filter(el => (el.name === req.query.name)));
}); */