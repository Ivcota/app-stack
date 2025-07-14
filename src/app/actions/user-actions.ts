"use server";

import { appRuntime } from "@/runtime";
import { revalidatePath } from "next/cache";
import { updateUserSettings } from "@/app/services/user-services";

export interface UpdateUserSettingsState {
  success?: string;
  error?: string;
}

export const updateUserSettingsAction = async (
  _prevState: UpdateUserSettingsState,
  formData: FormData
): Promise<UpdateUserSettingsState> => {
  const userId = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const updateResult = await appRuntime.runPromise(
    updateUserSettings(userId, { name, email })
  );

  revalidatePath("/app/settings");

  return {
    success: updateResult.data ?? "Success",
    error: updateResult.error,
  } satisfies UpdateUserSettingsState;
};
