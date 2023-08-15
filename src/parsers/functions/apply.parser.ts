import { ElementHandle, Page } from "puppeteer";
import { getSelectors } from "../../selectors";
import { applyRec, checkApplied } from "../../utils";

export const apply = async (
  page: Page,
  jobPostings: ElementHandle<HTMLAnchorElement>[]
) => {
  const { jobsApplySelector } = getSelectors();

  // launch a loop to go through all the postings
  for (let i = 0; i < jobPostings.length; i++) {
    const postingAnchor = jobPostings[i];
    await postingAnchor.click();

    await page.waitForTimeout(1000);
    const alreadySent = await checkApplied(page);
    if (alreadySent) {
      continue;
    }

    // if the apply button is not found skip the application
    try {
      await page.waitForSelector(jobsApplySelector + ":not([disabled])");
      await page.waitForFunction(
        `document.querySelector("${jobsApplySelector} span").innerText == "Easy Apply"`
      );
      const jobsApplyBtn = await page.$(jobsApplySelector);
      if (!jobsApplyBtn) {
        throw new Error("Apply button not found");
      }
      await jobsApplyBtn.click();
    } catch (err) {
      console.error("Apply button not found");
      continue;
    }

    // fill the form and apply to the job
    const { applied } = await applyRec(page);
    if (applied) {
      const scrollDistance = 100;
      await page.evaluate((distance) => {
        window.scrollBy(0, distance);
      }, scrollDistance);
      continue;
    }
  }

  return { success: true };
};
