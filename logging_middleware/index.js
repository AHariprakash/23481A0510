const axios = require("axios");

const clientID = "28b78506-7f04-4210-bf92-4a9591707e07";
const clientSecret = "xNrbfDuECTkJbJxB";
const email = "anumukonda.hariprakash@gmail.com";
const name = "hari prakash";
const rollNo = "23481a0510";
const accessCode = "eJdCuC";

const BASE_URL = "http://4.224.186.213/evaluation-service";

// Get auth token
async function getToken() {
  const response = await axios.post(`${BASE_URL}/auth`, {
    email,
    name,
    rollNo,
    accessCode,
    clientID,
    clientSecret,
  });
  return response.data.access_token;
}

// Reusable Log function
async function Log(stack, level, pkg, message) {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${BASE_URL}/logs`,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Log created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Logging failed:", error.response?.data || error.message);
  }
}

module.exports = { Log };