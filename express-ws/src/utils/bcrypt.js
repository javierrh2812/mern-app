import bcrypt from "bcrypt";

const saltRounds = 10;

export const encrypt = (string) => bcrypt.hashSync(string, saltRounds);
export const check = (plainText, hash) => bcrypt.compareSync(plainText, hash);
