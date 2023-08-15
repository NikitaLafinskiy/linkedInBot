import { ElementHandle, Page } from "puppeteer";
import { getSelectors } from "../../selectors";

export const findPages = async (
  page: Page
): Promise<ElementHandle<HTMLButtonElement>[]> => {
  const { pagesSelector } = getSelectors();

  await page.waitForSelector(pagesSelector + " li button");
  const pages = (await page.$$(
    pagesSelector + " li button"
  )) as ElementHandle<HTMLButtonElement>[];

  return pages;
};
