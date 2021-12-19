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
const { moveInfo } = require('./mocks/movesInfo_mocks');
const { moveInfo2 } = require('./mocks/movesInfo_mocks2');
const { moveInfo3 } = require('./mocks/movesInfo_mocks3');
const { pokemonInfo } = require('./mocks/pokemonInfo_mocks');
const { pokemonInfo2 } = require('./mocks/pokemonInfo_mocks2');
const { pokemonInfo3 } = require('./mocks/pokemonInfo_mocks3');
const { speciesAll } = require('./mocks/speciesAll_mocks');
const { evolvesAll } = require('./mocks/evolvesAll_mocks');
const { userData } = require('./mocks/usuarios_mocks');
//init
const { pokemonInit } = require('./initJson/pokemonInitJSON.js');
const { MoveInit } = require('./initJson/movesInitJSON.js');


let pokemonAllInfo=[...pokemonInfo,...pokemonInfo2,...pokemonInfo3];
let moveAllInfo=[...moveInfo,...moveInfo2,...moveInfo3];
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

app.get("/movescant", (req, res) => {
   res.send({cant:parseInt(moveAllInfo.length)});
});
app.get("/pokemoncant", (req, res) => {
   res.send({cant:parseInt(pokemonAllInfo.length)});
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

app.post("/addmove", (req, res) => {
   const { name, type, power } = req.body;
   let id = moveAllInfo.length + 1;
   let url = "https://pokeapi.co/api/v2/move/" + id+"/";
   moveAllInfo.push({ id, name, power, type: { name: type } });
   movesNameURL.results.push({ name: name, url: url });
   console.log(id, name, power, type, url);
   res.send("Se agrego un move");

});

app.post("/addpokemon", (req, res) => {
   const { name, type, description,hp,attack,defense,specialAttack,specialDefense,speed} = req.body;
   let id = pokemonAllInfo.length + 1;
   let pokemon={
    "id": id,
    "new":1,
    "moves": [
        {
            "move": {
                "name": "",
                "url": ""
            },
            "version_group_details": [
                {
                    "level_learned_at": 0,
                    "move_learn_method": {
                        "name": "",
                        "url": ""
                    },
                    "version_group": {
                        "name": "",
                        "url": ""
                    }
                }
            ]
        }
    ],
    "name":name,
    "stats": [
        {
            "base_stat": hp,
            "effort": 0,
            "stat": {
                "name": "hp",
                "url": "https://pokeapi.co/api/v2/stat/1/"
            }
        },
        {
            "base_stat": attack,
            "effort": 0,
            "stat": {
                "name": "attack",
                "url": "https://pokeapi.co/api/v2/stat/2/"
            }
        },
        {
            "base_stat": defense,
            "effort": 0,
            "stat": {
                "name": "defense",
                "url": "https://pokeapi.co/api/v2/stat/3/"
            }
        },
        {
            "base_stat": specialAttack,
            "effort": 1,
            "stat": {
                "name": "special-attack",
                "url": "https://pokeapi.co/api/v2/stat/4/"
            }
        },
        {
            "base_stat": specialDefense,
            "effort": 0,
            "stat": {
                "name": "special-defense",
                "url": "https://pokeapi.co/api/v2/stat/5/"
            }
        },
        {
            "base_stat": speed,
            "effort": 0,
            "stat": {
                "name": "speed",
                "url": "https://pokeapi.co/api/v2/stat/6/"
            }
        }
    ],
    "types": [
        {
            "slot": 1,
            "type": {
                "name": type,
                "url": ""
            }
        }
    ],
};
   console.log(pokemonAllInfo.length,id)
   let url = "https://pokeapi.co/api/v2/pokemon/" + id+"/";
   pokemonAllInfo.push(pokemon);
   console.log(pokemonAllInfo.length);
   speciesAll.push({
      flavor_text_entries:[
         {
         flavor_text:description
         }
      ],
      evolution_chain:{}
   })
   pokemonNameURL.results.push({ name: name, url: url });
   console.log(id,name, type, description,hp,attack,defense,specialAttack,specialDefense,speed);
   res.send("Se agrego un pokemon");

});


app.put("/editmove", (req, res) => {
   const { name, power, type, id } = req.body;
   let i = id-1;
   movesNameURL.results[i].name = name;
   if (moveAllInfo[i]) {
      log(moveAllInfo[i])
      moveAllInfo[i].name = name;
      moveAllInfo[i].type.name = type;
      moveAllInfo[i].power = power;
      log("cambio un move")
   }
   res.send("usuario ha sido modificado");
})


app.put("/user/cambiar/", (req, res) => {
   const { name, email, pass, id } = req.body;
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
   userData.push({ email, name, pass });
   log(name, email, pass);
   res.send("Se agrego un usuario");
});

/* let arrayPokemones=[];
(async () => {
   for (let i = 601; i < 827; i++) {
      axios.get("https://pokeapi.co/api/v2/move/" + i)
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
   for (let i = 201; i < 301; i++) {
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
   for (let i = 201; i < 301; i++) {
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