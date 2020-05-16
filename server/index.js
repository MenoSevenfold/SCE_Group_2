if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const express = require("express");
const userSchema = require("./schemas/userSchema");
const apartmentSchema = require("./schemas/apartmentSchema");
const orderSchema = require("./schemas/orderSchema");

const bodyParser = require("body-parser");

const mongoDB =
  "mongodb+srv://" +
  process.env.GroupTwoProjectMongoUser +
  ":" +
  process.env.GroupTwoProjectMongoPassword +
  "@" +
  process.env.GroupTwoProjectMongoURL;
const app = express();

const usersModel = mongoose.model("users", userSchema);
const apartmentModel = mongoose.model("apartments", apartmentSchema);
const orderModel = mongoose.model("orders", orderSchema);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = [
    "http://localhost:3000",
    "https://sce-group-2-front.herokuapp.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get_apartments", (req, res) => {
  return apartmentModel
    .find()
    .then(async (apartments) => {
      res.send(apartments);
    })
    .catch((err) => {
      res.status("404").send(err.message);
    });
});
app.get("/get_my_apartments", (req, res) => {
  const userCredentials = req.query;
  const owner = userCredentials.userID;
  return apartmentModel
    .find({ owner })
    .then(async (apartments) => {
      res.send(apartments);
    })
    .catch((err) => {
      res.status("404").send(err.message);
    });
});
app.get("/get_orders", (req, res) => {
  const userCredentials = req.query;
  const owner = userCredentials.userID;
  return orderModel
    .find({ apartmentOwner: owner })
    .then(async (orders) => {
      res.send(orders);
    })
    .catch((err) => {
      res.status("404").send(err.message);
    });
});

app.get("/get_orders", (req, res) => {
  const userCredentials = req.query;
  const owner = userCredentials.userID;
  return orderModel
    .find({ apartmentOwner: owner })
    .then(async (orders) => {
      res.send(orders);
    })
    .catch((err) => {
      res.status("404").send(err.message);
    });
});

app.get("/get_apartment", async (req, res) => {
  const apartmentData = req.query;
  const _id = apartmentData.apartmentID;
  return apartmentModel
    .findOne({ _id })
    .then(async (apartment) => {
      res.send(apartment);
    })
    .catch((err) => {
      res.status("404").send(err.message);
    });
});

app.post("/login_request", async (req, res) => {
  const userCredentials = req.body;

  return usersModel
    .findOne({ username: userCredentials.username })
    .then(async (user) => {
      if (user && userCredentials.password === user.password) {
        res.send(user);
      }
      const error = new Error("User or Password are incorrect");
      error.name = "UserLoginError";
      res.status("404").send(error.message);
    });
});

app.post("/apartment_update", async (req, res) => {
  const apartmentData = req.body;
  console.log(apartmentData);
  return apartmentModel
    .findOne({ _id: apartmentData.apartmentID })
    .then(async (apartment) => {
      Object.assign(apartment, apartmentData);
      try {
        apartment.save();
      } catch (err) {
        res.status("503").send(err.message);
      }
      res.send("Apartment updated");
    })
    .catch((err) => {
      res.status("503").send(err.message);
    });
});

app.post("/add_apartment", (req, res) => {
  const apartmentData = req.body;
  var apartmentInstance = new apartmentModel(apartmentData);
  apartmentInstance.save();
  res.send("Apartment Added");
});
app.post("/order_apartment", (req, res) => {
  const data = req.body;
  var orderInstance = new orderModel(data);
  orderInstance.save();
  res.send("Order added successfuly");
});
app.post("/delete_apartment", async (req, res) => {
  const apartmentData = req.body;
  return apartmentModel
    .deleteOne({ _id: apartmentData.apartmentID })
    .then(() => {
      orderModel
        .deleteMany({ apartmentID: apartmentData.apartmentID })
        .then(() => res.send("Apartment Deleted"))
        .catch((err) => res.status("404").send(err.message));
    })
    .catch((err) => res.status("404").send(err.message));
});

app.post("/register_request", (req, res) => {
  const userCredentials = req.body;
  var user_instance = new usersModel(userCredentials);
  return usersModel
    .findOne({ username: userCredentials.username })
    .then((result) => {
      if (!result) {
        user_instance.save();
        res.send("User entered successfully!");
      }
      const error = new Error("User already exist");
      error.name = "UserAlreadyExistError";
      throw error;
    })
    .catch((err) => {
      res.status("404").send(err.message);
    });
});

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`app is running. port: ${port}`);
      console.log(`localhost:${port}/`);
    });
  })
  .catch((err) => console.log(err));
