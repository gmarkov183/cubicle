const fs = require("fs/promises");
const path = require("path");
const Accessory = require("../models/Accessory");

const Cube = require("../models/Cube");

exports.getAll = async (search = "", fromInput, toInput) => {
  const from = Number(fromInput) || 0;
  const to = Number(toInput) || 6;

  // let cubes = await Cube.find(
  //   { name: { $regex: new RegExp(search, "i") },
  //   difficultyLevel: { $and: [{ $gte: from }, { $lte: to }] }
  //  },
  // ).lean();

  let cubes = await Cube.find({name: { $regex: new RegExp(search, 'i')}})
  .where('difficultyLevel').lte(to).gte(from)
  .lean();

  // const result = cubes
  // .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
  // .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);

  return cubes;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneDetails = (cubeId) =>
  Cube.findById(cubeId).populate("accessories");

exports.create = (cube) => {
  return Cube.create(cube);
};

exports.attachAccessory = async (cubeId, accessoryId) => {
  const cube = await Cube.findById(cubeId);
  const accessory = await Accessory.findById(accessoryId);

  cube.accessories.push(accessory);
  accessory.cubes.push(cube);

  await cube.save();
  await accessory.save();

  return cube;
};
