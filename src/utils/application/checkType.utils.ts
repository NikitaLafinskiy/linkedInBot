import { Page } from "puppeteer";
import { getSelectors } from "../../selectors";
import { checkForm } from "./checkForm.utils";
import { fillInputs } from "./fillInputs.utils";

export const checkType = async (
  page: Page
): Promise<{ type: string; isValid: boolean }> => {
  const {
    nextStepSelector,
    reviewApplicationSelector,
    submitSelector,
    postApplySelector,
  } = getSelectors();

  const { nextStep, reviewApplication, submitApplication, applied } =
    await page.evaluate(
      async (selectors) => {
        const nextStep = document.querySelector(selectors[0]);
        const reviewApplication = document.querySelector(selectors[1]);
        const submitApplication = document.querySelector(selectors[2]);
        const applied = document.querySelector(selectors[3]);

        if (applied) {
          return {
            nextStep: false,
            reviewApplication: false,
            submitApplication: false,
            applied,
          };
        }

        return {
          nextStep,
          reviewApplication,
          submitApplication,
          applied,
        };
      },
      [
        nextStepSelector,
        reviewApplicationSelector,
        submitSelector,
        postApplySelector,
      ]
    );

  if (applied) {
    return { type: "applied", isValid: true };
  }

  if (submitApplication) {
    return { type: "submit", isValid: true };
  }

  if (reviewApplication) {
    const formOptions = await checkForm(page);
    const { isValid } = await fillInputs(page, { ...formOptions });
    return { type: "review", isValid };
  }

  if (nextStep) {
    const formOptions = await checkForm(page);
    const { isValid } = await fillInputs(page, { ...formOptions });
    return { type: "next", isValid };
  }

  return { type: "none", isValid: false };
};
