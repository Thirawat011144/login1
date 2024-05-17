// const express = require("express");
// const bcrypt =require('bcryptjs')
// const jwt = require('jsonwebtoken');
// const UsersModel = require("../models/usersModel");
// const authenticateToken = require("../middleware/AuthenticateToken");
// require('dotenv').config() 

// const router = express.Router();

// router.post("/register", async (req, res) => {
//   try {
//     const existingUser = await UsersModel.findOne({
//       where: { userName: req.body.userName },
//     });
//     if (existingUser) {
//       res.status(400).send({ message: "Username already exists" });
//     } else {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);
//       const result = await UsersModel.create({
//         userName: req.body.userName,
//         password: hashedPassword,
//       });
//       await result.save();
//       res.send({ message: "Success", result: result });
//     }
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const existingUser = await UsersModel.findOne({
//       where: { userName: req.body.userName },
//     });

//     if (existingUser) {
//       const isMatch = await bcrypt.compare(req.body.password, existingUser.password);
//       if (!isMatch) {
//         return res.status(400).send("Username or password invalid");
//       } else {
//         const payload = {
//           existingUser: {
//             name: existingUser.userName
//           }
//         };
//         jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '50s' }, (error, token) => {
//           if (error) throw error;
//           res.json({ token, payload });
//         });
//       }
//     } else {
//       res.status(400).send("Username or password invalid");
//     }
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// router.get("/login", authenticateToken, async (req, res) => {
//   try {
//     const users = await UsersModel.findAll();
//     res.send(users);
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// });

// module.exports = router;


const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersModel = require("../models/usersModel");
const authenticateToken = require("../middleware/AuthenticateToken");
require('dotenv').config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const existingUser = await UsersModel.findOne({
      where: { userName: req.body.userName },
    });
    if (existingUser) {
      res.status(400).send({ message: "Username already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const result = await UsersModel.create({
        name: req.body.name,
        surename: req.body.surename,
        userName: req.body.userName,
        password: hashedPassword,
        company: req.body.company,
        year: req.body.selectedYear,
        branch: req.body.selectedBranch,
        phoneNumber: req.body.phoneNumber,
        idStudent: req.body.idStudent
      });
      await result.save();
      res.json({ message: "Success", result: result });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const existingUser = await UsersModel.findOne({
      where: {
        userName: req.body.userName
      },
    });

    if (!existingUser) {
      return res.status(400).json({ message: "Username or Password Invalid" });
    }

    const isMatch = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Username or Password Invalid" });
    }

    const data = {
      name: existingUser.userName,
      role: existingUser.role
    };

    jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' }, (error, token) => {
      if (error) {
        throw error;
      }
      res.json({ token, data, message: "Success" });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// router.get("/login/info" ,async (req, res) =>{
//   try {
//     const userName = await UsersModel.findOne({
//       where:{
//         userName:req.body.userName
//       }
//     }) 
//     const payload = {
//       name:userName.userName
//     }
//     res.json({payload})
//   } catch (error) {
//     res.status(500).send({message:error.message})
//   }
// })

router.get("/fetchData", async (req, res) => {
  try {
    const users = await UsersModel.findAll({
      attributes: { exclude: ['password'] } // ระบุฟิลด์ที่ไม่ต้องการรวมในผลลัพธ์
    });
    res.send(users);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/fetch/data/value/:id", async (req, res) => {
  try {
    const user = await UsersModel.findByPk(req.params.id, {
      // attributes: { exclude: ['password'] } // ระบุฟิลด์ที่ไม่ต้องการรวมในผลลัพธ์
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.put("/update/data/:id", async (req, res) => {
  try {
    const user = await UsersModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // อัปเดตข้อมูลผู้ใช้จาก payload ที่ได้รับ
    const { name, surename, userName, company, branch, year, phoneNumber, idStudent } = req.body;

    Object.assign(user, { name, surename, userName, company, branch, year, phoneNumber, idStudent });

    // บันทึกการเปลี่ยนแปลง
    await user.save();

    res.json({ data: user, message: "Success" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});


router.delete("/remove/data/:id", async (req, res) => {
  try {
    const user = await UsersModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await user.destroy();
    res.send({ message: "User deleted successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});


module.exports = router;
