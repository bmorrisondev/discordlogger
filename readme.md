# DiscordLogger

A package that streamlines logging from Node projects to a Discord Webhook

## Usage

```js
// Import the library
const DiscordLogger = require("@brianmmdev/discordlogger");

// Create an instance
const logger = new DiscordLogger("my app name", "https://discord.webhook/here");

// Log stuff
await logger.info("some message");
await logger.debug("some message");
await logger.error(someErr, "optional message");
```
