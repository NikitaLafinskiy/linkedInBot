import { Page } from "puppeteer";
import { getSelectors } from "../../selectors";
import { checkType } from "./checkType.utils";

export const applyRec = async (page: Page): Promise<{ applied: boolean }> => {
  const {
    nextStepSelector,
    submitSelector,
    reviewApplicationSelector,
    modalSelector,
    discardSelector,
    postApplySelector,
  } = getSelectors();
  const { type, isValid } = await checkType(page);

  // if there are bad inputs skip to the next application (first should also click on close)
  if (!isValid) {
    await closeSubmission(page, modalSelector);
    await page.waitForSelector(discardSelector);
    const discardBtn = await page.$(discardSelector);
    await discardBtn?.click();
    return { applied: true };
  }

  // click on the corresponding button
  switch (type) {
    case "applied":
      await closeSubmission(page, modalSelector);
      return { applied: true };
    case "submit":
      await page.waitForSelector(submitSelector);
      const btn = await page.$(submitSelector);
      await btn?.click();
      await page.waitForSelector(postApplySelector);
      await applyRec(page);
      break;
    case "review":
      await applySuccess(page, reviewApplicationSelector);
      break;
    case "next":
      await applySuccess(page, nextStepSelector);
      break;
  }
  return { applied: true };
};

const applySuccess = async (page: Page, selector: string) => {
  await page.waitForSelector(selector);
  const btn = await page.$(selector);
  await btn?.click();
  await applyRec(page);
};

const closeSubmission = async (page: Page, selector: string) => {
  await page.waitForSelector(selector);
  const modal = await page.$(selector);
  const modalBox = await modal?.boundingBox();
  if (modalBox) {
    const x = modalBox.x + 1;
    const y = modalBox.y + modalBox.height / 2;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.up();
  }
};
