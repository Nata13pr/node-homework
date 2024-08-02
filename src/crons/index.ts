import { reminderToVisitAgainCron } from "./remider-to-visit-again";
import { removeOldTokensCron } from "./remove-old-tokens.cron";
import { removeOldPasswordsCron } from "./remove-passwords.cron";
import { testCron } from "./test.cron";

export const jobRunner = () => {
  testCron.start();
  removeOldTokensCron.start();
  removeOldPasswordsCron.start();
  reminderToVisitAgainCron.start();
};
