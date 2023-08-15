import { ElementHandle, Page } from "puppeteer";
import { getSelectors } from "../../selectors";

export const fillInputs = async (
  page: Page,
  {
    hasInputs,
    hasMenu,
    hasOptions,
    hasSelect,
    hasFieldSet,
    hasCheckbox,
  }: {
    hasInputs: boolean;
    hasMenu: boolean;
    hasOptions: boolean;
    hasSelect: boolean;
    hasFieldSet: boolean;
    hasCheckbox: boolean;
  }
): Promise<{ isValid: boolean }> => {
  const { inputSelector, optionsSelector, selectSelector, checkboxSelector } =
    getSelectors();

  // go to the next application if there is an input element
  if (hasMenu || hasFieldSet) {
    return { isValid: false };
  }

  // fill in inputs
  if (hasInputs) {
    await page.waitForFunction(
      (selector) => {
        const input = document.querySelector(selector) as HTMLInputElement;
        return input && !input.disabled && !input.readOnly;
      },
      {},
      inputSelector
    );

    const inputs = (await page.$$(
      inputSelector
    )) as ElementHandle<HTMLInputElement>[];

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const innerInputValue = await (
        await input.getProperty("value")
      ).jsonValue();

      if (innerInputValue === "") {
        await input.type("2", { delay: 30 });
      }
    }
  }

  // select the first option on each options field
  if (hasOptions) {
    await page.waitForSelector(optionsSelector);
    await page.evaluate((selector) => {
      const options = document.querySelectorAll(selector);

      for (let i = 0; i < options.length; i++) {
        const option = options[i] as HTMLSelectElement;
        option.selectedIndex = 1;
      }
    }, optionsSelector);
  }

  // select the first option out of the selection field
  if (hasSelect) {
    await page.waitForSelector(selectSelector);
    await page.waitForSelector(`${selectSelector} option`);

    const selectElements = (await page.$$(
      selectSelector
    )) as ElementHandle<HTMLSelectElement>[];

    for (let i = 0; i < selectElements.length; i++) {
      const selectElement = selectElements[i];

      const options = await selectElement.evaluateHandle((selectEl) =>
        Array.from(selectEl.options).map((option) => option.value)
      );
      const optionsVals = await options.jsonValue();
      const selectElementValue = await (
        await selectElement.getProperty("value")
      ).jsonValue();

      if (selectElementValue === "Select an option") {
        await selectElement.select(optionsVals[1]);
      }
    }
  }

  // check all the checkboxes
  if (hasCheckbox) {
    await page.waitForSelector(checkboxSelector);

    const checkBoxElements = await page.$$(checkboxSelector);
    console.log(checkBoxElements);
    for (let i = 0; i < checkBoxElements.length; i++) {
      const checkBox = checkBoxElements[i] as ElementHandle<HTMLInputElement>;
      await checkBox.evaluate((box) => {
        if (!box.checked) {
          box.checked = true;
        }
      });
    }
  }

  return { isValid: true };
};
