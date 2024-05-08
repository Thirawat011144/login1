const jwt = require("jsonwebtoken");
require('dotenv').config();

function authenticateToken(req, res, next) {
  // รับ token จาก header ของ request
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401) // ถ้าไม่มี token ให้ส่ง status code 401 Unauthorized กลับไป

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // ถ้า token ไม่ถูกต้องหรือหมดอายุ ให้ส่ง status code 403 Forbidden กลับไป
    req.user = user; // เก็บข้อมูลของผู้ใช้ใน req.user เพื่อให้ middleware อื่นๆ สามารถเข้าถึงได้
    next(); // ทำให้ Express ไปทำ middleware ถัดไปหลังจาก middleware นี้ผ่าน
  });
}

module.exports = authenticateToken;

