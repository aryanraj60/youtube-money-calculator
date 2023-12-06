const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const sgMail = require("@sendgrid/mail");
const bodyParser = require("body-parser");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendCallbackEmail = async (name, contactNumber) => {
  const msg = {
    to: "aryanraj234.arr@gmail.com",
    from: "aryanraj234.ar@gmail.com", // Replace with your verified sender email
    subject: "Callback Request",
    text: `Callback Request received\n\nName: ${name}\nContact Number: ${contactNumber}`,
  };

  await sgMail.send(msg);
};

app.get("/", (req, res) => {
  res.send("Api Is Working...");
});

app.post("/api/callback", async (req, res) => {
  const { name, mobile } = req.body;

  if (name && mobile) {
    // Send email notification
    try {
      await sendCallbackEmail(name, mobile);

      res.status(200).json({
        message: "Callback request received successfully",
        success: true,
      });
    } catch (e) {
      console.log("Axios Error", e.response.body);
      res.status(400).send("Something went wrong");
    }
  } else {
    res.status(400).send("Invalid email address or number");
  }
});

app.get("/api/getVideoById", async (req, res) => {
  const videoId = req.query.videoId;

  if (videoId) {
    try {
      const apiKey = process.env.YTB_API_KEY;

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${apiKey}`
      );

      if (response.data.items[0]) {
        res.status(200).json({
          data: response.data,
          success: true,
        });
      } else {
        res.status(400).send("Failed to retrieve video details...");
      }
    } catch (err) {
      console.log("AXIOS_Get_Video_ERROR", err);
      res.status(400).send("Failed to retrieve video details...");
    }
  } else {
    res.status(400).send("Invalid video Id");
  }
});

app.get("/api/getChannelById", async (req, res) => {
  const channelId = req.query.channelId;

  if (channelId) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${process.env.YTB_API_KEY}`
      );

      if (response.data.items[0]) {
        res.status(200).json({
          data: response.data,
          success: true,
        });
      } else {
        res.status(400).send("Failed to retrieve channel Details");
      }
    } catch (e) {
      console.log("Channel_AXIOS_ERROR", e);
      res.status(400).send("Failed to retrieve channel Details");
    }
  } else {
    res.status(400).send("Invalid channel Id");
  }
});

app.get("/api/getVideosByCategoryId", async (req, res) => {
  const categoryId = req.query.categoryId;

  if (categoryId) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=${categoryId}&maxResults=5&key=${process.env.YTB_API_KEY}`
      );

      if (response.data.items.length > 0) {
        res.status(200).json({
          data: response.data,
          success: true,
        });
      } else {
        res.status(400).send("Failed to retrieve videos by category...");
      }
    } catch (e) {
      console.log("Channel_AXIOS_ERROR", e);
      res.status(400).send("Failed to retrieve videos by category...");
    }
  } else {
    res.status(400).send("Invalid channel Id");
  }
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
