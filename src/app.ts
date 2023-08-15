import { init } from "./parsers";

(async () => {
  await init(
    "https://www.linkedin.com/jobs/search/?currentJobId=3654161937&f_AL=true&f_E=1%2C2%2C3%2C4&f_JT=F%2CP%2CC&f_T=9%2C25170%2C191%2C25201%2C25764%2C39%2C25194%2C25169%2C17265&f_WT=2%2C3&geoId=105072130&keywords=backend%20developer%20node&location=Poland&refresh=true&sortBy=R"
  );
})();

// "https://www.linkedin.com/jobs/search/?currentJobId=3648429337&distance=25&f_AL=true&f_WT=2&geoId=105072130&keywords=full%20stack%20developer"
