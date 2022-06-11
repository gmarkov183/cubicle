const fs = require('fs/promises');
const path = require('path');

const cubes = require('../db.json');

exports.getOne = (cubeId) => cubes[cubeId];

exports.save = (cube) => {
    cubes.push(cube);

    let texData = JSON.stringify(cubes, '', 4);
    return fs.writeFile(path.resolve('src', 'db.json'),texData , {encoding: 'utf-8'});
};