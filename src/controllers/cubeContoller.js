const req = require("express/lib/request");
const cubeService = require('../services/cubeService')

const router = require("express").Router();



router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const cube = req.body;

  //Validate
  if (cube.name.length < 2) {
    return res.status(400).send("Invalid request");
  }
  //Save data
  cubeService.save(cube)
  .then(() => {
//Redirect to page
    res.redirect('/');
  })
  .catch(err => {
      res.status(400).send(err);
  })
  
});

router.get('/details/:id',  (req, res) => {
    const cube =  cubeService.getOne(req.params.id);

    res.render('details', { cube });
});

module.exports = router;
