const mongoose = require("mongoose");
const cities = require("../seeds/cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/camp-project", {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection error:", err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  try {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
      const randomIndex = Math.floor(Math.random() * cities.length);
      const price = Math.floor(Math.random() * 1000) + 500;
      const camp = new Campground({
        author: "67678d12e7b51adad80ab94a",
        location: `${cities[randomIndex].city}, ${cities[randomIndex].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis blanditiis totam mollitia nobis eaque vel voluptas necessitatibus, expedita earum, optio asperiores, quidem ea accusantium voluptatem assumenda repellat veritatis.",
        price,
        geometry: {
          type: "Point",
          coordinates: [
            cities[randomIndex].longitude,
            cities[randomIndex].latitude,
          ],
        },
        images: [
          {
            url: "https://res.cloudinary.com/dgvim3hzm/image/upload/v1735036797/Camp/bsw5gawvxdsf4e4podpf.jpg",
            filename: "Camp/bsw5gawvxdsf4e4podpf",
          },
          {
            url: "https://res.cloudinary.com/dgvim3hzm/image/upload/v1735036801/Camp/wlozkydkoqyzhfhqnetz.jpg",
            filename: "Camp/wlozkydkoqyzhfhqnetz",
          },
        ],
      });
      await camp.save();
    }
    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seedDB()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
