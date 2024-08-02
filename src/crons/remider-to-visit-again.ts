import { CronJob } from "cron";

import { EmailTypeEnum } from "../enums/email-type.enum";
import { tokenRepository } from "../repositories/user/token.repository";
import { userRepository } from "../repositories/user/user.repository";
import { emailService } from "../services/user/email.service";

const handler = async () => {
  try {
    console.log("[reminderToVisitAgainCron] Cron is running");

    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const allUsers = await tokenRepository.findByParamsMany({
      createdAt: { $lte: ninetyDaysAgo },
    });
    const uniqueUsers = new Map();

    for (const tokenObject of allUsers) {
      const user = await userRepository.getById(tokenObject._userId);
      if (!uniqueUsers.has(user.name)) {
        uniqueUsers.set(user.name, user.email);
      }
    }
    await Promise.all(
      Array.from(uniqueUsers.entries()).map(async ([name, email]) => {
        await emailService.sendEmail(EmailTypeEnum.OLD_VISIT, email, { name });
      }),
    );

    console.log("[reminderToVisitAgainCron] Cron finished");
  } catch (error) {
    console.error("[reminderToVisitAgainCron] Cron failed", error);
  }
};

export const reminderToVisitAgainCron = new CronJob("0 10 * * *", handler);
