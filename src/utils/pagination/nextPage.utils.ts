import { ElementHandle } from "puppeteer";

export const nextPage = async (
  pages: ElementHandle<HTMLButtonElement>[],
  iteration: number
) => {
  const nextBtn = pages[iteration + 1];
  await nextBtn.click();
};
