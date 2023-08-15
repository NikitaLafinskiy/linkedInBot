import fs from "fs";

export const setCookies = async (page: any) => {
  let cookiesStr = fs.readFileSync("./cookies.json", "utf8");
  console.log(cookiesStr);
  let cookies = JSON.parse(cookiesStr);

  await page.setCookie.apply(page, cookies);
  return;
};
