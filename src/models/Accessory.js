const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: /^http?/g,
      message: "Image url should be a link",
    },
  },
  description: {
    type: String,
    maxlength: 120,
    required: true,
  },
    ref: 'Cube'
  }
]
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
