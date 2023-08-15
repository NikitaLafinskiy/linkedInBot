import { Page } from "puppeteer";
import { getSelectors } from "../../selectors";

export const checkApplied = async (page: Page) => {
  const { alreadySentSelector } = getSelectors();

  const alreadySent = await page.evaluate((selector) => {
    const applySuccess = document.querySelectorAll(
      selector
    )[0] as HTMLSpanElement;

    if (!applySuccess) {
      return false;
    }

    if (applySuccess.innerText.includes("Applied")) {
      console.log("applied if true");
      return true;
    }
  }, alreadySentSelector);
  console.log("returning");
  return alreadySent;
};
