process.removeAllListeners("uncaughtException");
process.on("uncaughtException", (err) => {
  console.log(red("Error:"), err.message);
  if (!(err instanceof VisibleError)) {
    console.log();
    console.trace(err.stack);
  }
  console.log();
  console.log(
    `Need help with this error? Join our discord ${blue(
      `https://discord.gg/sst`
    )} and talk to the team`
  );
  process.exit(1);
});

process.on("beforeExit", () => {});

import { blue, red } from "colorette";
import { VisibleError } from "@core/error.js";

import { program } from "./program.js";
import { secrets } from "./commands/secrets/secrets.js";
import { update } from "./commands/update.js";
import { start } from "./commands/start.js";
import { bind } from "./commands/bind.js";
import { build } from "./commands/build.js";

secrets(program);
update(program);
start(program);
bind(program);
build(program);

program
  .fail((msg, error) => {
    if (!error) {
      console.log(msg);
      return;
    }
    throw error;
  })
  .parse();
