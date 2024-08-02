import { CronJob } from "cron";

import { oldPasswordRepository } from "../repositories/user/old-password.repository";

const handler = async () => {
  try {
    console.log("[removeOldPasswordsCron] Cron is running");
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    const result = await oldPasswordRepository.deleteByParams({
      createdAt: { $lte: ninetyDaysAgo },
    });
    console.log("[removeOldPasswordsCron] Documents deleted", result);
    console.log("[removeOldPasswordsCron] Cron finished");
  } catch (error) {
    console.error("[removeOldPasswordsCron] Cron failed", error);
  }
};

export const removeOldPasswordsCron = new CronJob("0 1 * * *", handler);
