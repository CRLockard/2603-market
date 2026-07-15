import express from "express";
import requireBody from "#middleware/requireBody";
import { createUser, getUserByUsername } from "#db/queries/users";
import bcrypt from "bcrypt";
import { createToken } from "#utils/jwt";

const router = express.Router();

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const user = await getUserByUsername(req.body.username);

    if (user) {
      res.status(400).send("Username not avaiable.");
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const hashedUser = await createUser(req.body.username, hashedPassword);

    const token = await createToken({ id: hashedUser.id });

    res.status(201).send(token);
  },
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const user = await getUserByUsername(req.body.username);

    if (!user) {
      res.status(401).send("Invalid Username or Password");
      return;
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!passwordMatch) {
      res.status(401).send("Invalid Username or Password.");
      return;
    }

    const token = createToken({ id: user.id });

    res.status(200).send(token);
  },
);

export default router;
