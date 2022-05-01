const User = require("../db/models/users");
const { generateToken } = require("./utils");

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Wrong password",
      });
    } else {
      return res.status(200).json({
        user: generateToken(user._id, user.isAdmin),
      });
    }
  } else {
    return res.status(400).json({
      message: "User not found",
    });
  }
};

module.exports = {
  authUser,
};
