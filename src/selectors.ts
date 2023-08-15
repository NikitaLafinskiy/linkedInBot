export const getSelectors = () => {
  const nextStepAria = "Continue to next step";
  const reviewAria = "Review your application";
  const submitAria = "Submit application";
  const closeAria = "Dismiss";

  return {
    divToScrollSelector: ".jobs-search-results-list",
    jobsWrapperSelector: ".scaffold-layout__list-container",
    jobsApplySelector: ".jobs-apply-button",
    nextStepSelector: `[aria-label="${nextStepAria}"]`,
    reviewApplicationSelector: `[aria-label="${reviewAria}"]`,
    submitSelector: `[aria-label="${submitAria}"]`,
    inputSelector: ".artdeco-text-input--input",
    optionsSelector: ".fb-text-selectable__option",
    menuSelector: ".search-basic-typeahead",
    selectSelector: "select",
    alreadySentSelector: ".artdeco-inline-feedback__message",
    successHeaderSelector: ".jpac-modal-header",
    closeButtonSelector: `button[aria-label=${closeAria}]`,
    doneButtonSelector: ".artdeco-button--primary .artdeco-button__text",
    modalSelector: "[data-test-modal-container]",
    fieldSetSelector:
      "[data-test-form-builder-radio-button-form-component='true']",
    checkboxSelector: "fieldset[data-test-checkbox-form-component='true']",
    discardSelector: "[data-control-name='discard_application_confirm_btn']",
    postApplySelector: "[aria-labelledby='post-apply-modal']",
    applicationFormWrapperSelector: ".jobs-unified-top-card__content--two-pane",
    pagesSelector: ".artdeco-pagination__pages",
  };
};
