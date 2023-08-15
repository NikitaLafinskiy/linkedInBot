import { Page } from "puppeteer";
import { scroll } from "../../utils";
import { getSelectors } from "../../selectors";

export const loadPostings = async (page: Page) => {
  const { divToScrollSelector, jobsWrapperSelector } = getSelectors();

  await page.waitForSelector(
    divToScrollSelector + " .jobs-search-results-list__pagination"
  );
  const jobsWrapper = await page.$(jobsWrapperSelector);
  if (jobsWrapper === null) {
    throw new Error("The div has not loaded");
  }
  await scroll(page, divToScrollSelector);
  const jobPostings = await jobsWrapper.$$("li a");
  return { jobPostings, jobsWrapper };
};
