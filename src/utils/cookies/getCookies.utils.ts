import fs from "fs";
import { Protocol } from "puppeteer";

export const getCookies = async (cookies: Protocol.Network.Cookie[]) => {
  fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 4), (err) => {
    if (err) console.log(err);
    return;
  });
};
