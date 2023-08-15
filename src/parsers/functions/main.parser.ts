import { Page } from "puppeteer";
import { loadPostings } from "./load-postings.parser";
import { apply } from "./apply.parser";
import { findPages } from "../../utils/pagination/findPages.utils";
import { nextPage } from "../../utils/pagination/nextPage.utils";

export const main = async (page: Page) => {
  let pages = await findPages(page);

  // go through each page available
  for (let i = 0; i < pages.length; i++) {
    // reassign the pages each iteration so that it goes on forever until there are no pages left, if there are more pages to load left, reset the iteration to 0, else go on with the i
    pages = await findPages(page);
    if (i === 9) {
      console.log("when i is 9 reset to 5 after loading new pages");
      i = 5;
    }

    const { jobPostings } = await loadPostings(page);
    await apply(page, jobPostings);

    // when all the postings are applied to this is the next step, launch the new page
    console.log("reached next page");
    await nextPage(pages, i);
  }
};
