const fs = require("fs/promises");
const path = require("path");
const Accessory = require("../models/Accessory");

const Cube = require("../models/Cube");

exports.getAll = async (search = "", fromInput, toInput) => {
  let cubes = await Cube.find().lean();

  
  // const from = Number(fromInput) || 0;
  // const to = Number(toInput) || 6;

  // const result = cubes
  // .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
  // .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);

  return cubes;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.create = (cube) => {
  return Cube.create(cube);
};

exports.attachAccessory = async(cubeId, accessoryId) => {
  const cube = await  Cube.findById(cubeId);
  const accessory = await Accessory.findById(accessoryId);

  cube.accessories.push(accessory);
  accessory.cubes.push(cube);

  await cube.save();
  await accessory.save();

  return cube;
}
