import { Page } from "puppeteer";
import { getSelectors } from "../../selectors";

export const checkForm = async (
  page: Page
): Promise<{
  hasInputs: boolean;
  hasOptions: boolean;
  hasSelect: boolean;
  hasMenu: boolean;
  hasFieldSet: boolean;
  hasCheckbox: boolean;
}> => {
  const {
    inputSelector,
    optionsSelector,
    menuSelector,
    selectSelector,
    fieldSetSelector,
    checkboxSelector,
  } = getSelectors();

  const formType = await page.evaluate(
    (selectors) => {
      const inputs = document.querySelectorAll(selectors[0]);
      const options = document.querySelectorAll(selectors[1]);
      const menu = document.querySelectorAll(selectors[2]);
      const select = document.querySelectorAll(selectors[3]);
      const fieldSet = document.querySelectorAll(selectors[4]);
      const checkBox = document.querySelectorAll(selectors[5]);

      return {
        hasInputs: inputs.length !== 0,
        hasOptions: options.length !== 0,
        hasMenu: menu.length > 1,
        hasSelect: select.length !== 0,
        hasFieldSet: fieldSet.length !== 0,
        hasCheckbox: checkBox.length !== 0,
      };
    },
    [
      inputSelector,
      optionsSelector,
      menuSelector,
      selectSelector,
      fieldSetSelector,
      checkboxSelector,
    ]
  );

  return formType;
};
