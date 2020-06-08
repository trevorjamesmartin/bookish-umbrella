var express = require("express");
var secured = require("../middleware/secured");
var router = express.Router();
const usersModel = require("../../api/api-model");

/* GET user profile. */
router.get("/user", secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  // TODO, add session to db
  res.status(200).send("logged in, callback app");
  // res.render("user", {
  //   userProfile: JSON.stringify(userProfile, null, 2),
  //   title: "Profile page",
  // });
});

router.get("/users", (req, res) => {
  usersModel
    .find()
    .then((lst) => res.status(200).send(lst))
    .catch((error) => res.status(500).send(error));
});

/**
 * @api {get} /users/:username Get User
 * @apiName GetUser
 * @apiGroup Users
 * @apiParam {String} username username
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200
 * {
 *    "username": "Rosa"
 * }
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get("/user/:username", (req, res) => {
  usersModel
    .findByName(req.params.username)
    .then((usr) => {
      usr
        ? res.status(200).json(usr)
        : res.status(404).json({ error: `cannot find ${req.params.username}` });
    })
    .catch((error) => res.status(500).send(error));
});

router.put("/user/:username", (req, res) => {
  usersModel
    .updateUser(req.body, req.params.username)
    .then((updated) => res.status(200).json(updated))
    .catch(({ name, code, message, stack }) =>
      res.status(500).json({ name, code, message, stack })
    );
});

/**
 * @api {delete} /users/:username Del User
 * @apiName DelUserName
 * @apiGroup Users
 */
router.delete("/user/:id", (req, res) => {
  if (isCurrentUser(req.headers.authorization, req.params.id)) {
    res.status(200).json({ message: "please don't delete yourself" });
  } else {
    // TODO : superuser specification
    res.status(200).json({ message: "your superpowers had no effect" });
  }
});

module.exports = router;
