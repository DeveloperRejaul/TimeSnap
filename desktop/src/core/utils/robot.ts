import { Command } from "@tauri-apps/plugin-shell";

export const type = async (key: "a") => {
  const command1 = Command.sidecar('binaries/app', ["backspace"]);
  const command2 = Command.sidecar('binaries/app', [key]);
  await command1.execute();
  await command2.execute();
}

