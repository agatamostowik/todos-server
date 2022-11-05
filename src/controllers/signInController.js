import bcrypt from "bcrypt";
import { getUserByEmail } from "../models/index.js";

const test = () => {
  const saltRounds = 10;

  bcrypt.hash("qwerty", saltRounds, (err, hash) => {
    console.log("hash: ", hash);
  });

  //   bcrypt.compare(
  //     "qwerty",
  //     "$2b$10$NczxXeKtVT2t54zIZU2CE.o1B7AruAfbHMMgKdfwV8IuXtowBZs.e",
  //     (err, result) => {
  //       console.log("err: ", err);
  //       console.log("result: ", result);
  //     }
  //   );
};

// test();

export const signInController = async (req, res) => {
  const result = await getUserByEmail(req.body.email);
  console.log("result: ", result);
  res.json({
    firstName: "Jola",
    lastName: "Lojalna",
    email: "jola@wp.pl",
    phoneNumber: "123123123",
  });
};
