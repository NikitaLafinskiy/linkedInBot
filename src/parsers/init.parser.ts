import puppeteer from "puppeteer";
import { checkCookies, getCookies, setCookies } from "../utils";
import { main } from "./index";

export const init = async (jobUrl: string) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on("request", async (req) => {
    const cookies = await page.cookies();
    const { isWritten, isIntercepted } = checkCookies(cookies, "li_at");
    if (isIntercepted && !isWritten) {
      await getCookies(cookies);
    } else if (isWritten && !isIntercepted) {
      await setCookies(page);
    }
    req.continue();
  });

  await page.goto("https://linkedin.com/login");
  await page.goto(jobUrl);

  await main(page);
};
