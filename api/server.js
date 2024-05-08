// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const port = 3000;
// // const getClient = require("./controllers/connectController");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// const UsersController = require("./controllers/UsersController");
// app.use(UsersController);
// // app.post("/insert", async (req, res) => {
// //   // await client.connect();
// //   const rows = await client.query(
// //     "INSERT INTO tb_logins(userName, password) VALUES($1,$2)",
// //     [req.body.userName, req.body.password]
// //   );
// //   await client.end();

// //   res.send({ rows: rows });
// // });

// app.listen(port, () => {
//   console.log(`Example app listening on port`, port);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const AuthController = require("./controllers/AuthController");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', AuthController)


app.listen(port, () => {
  console.log(`Example app listening on port`, port);
});
