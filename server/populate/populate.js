/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipments = require("./equipments.json");
const brands = require("./brands.json");
const EmployeeModel = require("../db/employee.model");
const favouriteBrandModel = require("../db/favouriteBrand.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}
const populateBrands = async () => {
  await favouriteBrandModel.deleteMany({});
  const brandObjects = brands.map(brandName => ({favouriteBrand: brandName}));
  await favouriteBrandModel.create(...brandObjects);
  console.log("Brands created");
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  const brandsCollecttion = await favouriteBrandModel.find();
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    equipment: pick(equipments),
    favouriteBrand: pick(brandsCollecttion)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  
  await populateBrands();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
