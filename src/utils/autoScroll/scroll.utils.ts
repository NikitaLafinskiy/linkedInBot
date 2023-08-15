import { Page } from "puppeteer";

export const scroll = async (
  page: Page,
  divToScrollSelector: string
): Promise<void> => {
  await page.evaluate(async (selector) => {
    console.log("evaluating");
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const divElement = document.querySelector(
        selector
      ) as HTMLDivElement | null;
      console.log(divElement);

      if (!divElement) {
        resolve();
        return;
      }

      const timer = setInterval(() => {
        const scrollHeight = divElement.scrollHeight;
        divElement.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - divElement.clientHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 400);
    });
  }, divToScrollSelector);
};
