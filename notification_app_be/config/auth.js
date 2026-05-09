const axios = require("axios");
require("dotenv").config();

async function getToken() {
  const response = await axios.post(`${process.env.BASE_URL}/auth`, {
    email: "anumukonda.hariprakash@gmail.com",
    name: "hari prakash",
    rollNo: "23481a0510",
    accessCode: "eJdCuC",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  return response.data.access_token;
}

module.exports = { getToken };