const axios = require('axios');

const COLORS = {
  ERROR_RED: 16196387,
  DEBUG_PURPLE: 12666618
}

module.exports = class DiscordLogger {
  constructor(applicationName, webhookUrl) {
    this.applicationName = applicationName
    this.url = webhookUrl
  }

  async _buildEmbed(err, applicationName, message, color) {
    let date = new Date();
    let embed = {
      "timestamp": date.toISOString()
    }
    let description = ""

    if(message) {
      description += message
    }

    if(err != null && err != undefined) {
      description += "```\n" + err.stack + "```"
    }

    if(description !== "") {
      embed.description = description
    }

    if(applicationName) {
      embed.author = {
        "name": applicationName
      }
    }

    if(color) {
      embed.color = color
    }

    return embed;
  }

  async _pushMessage(embed) {
    let body = {
      "embeds": [
        embed
      ]
    }

    let opts = {
      method: "POST",
      url: this.url,
      headers: {
        "content-type": "application/json"
      },
      data: body
    }

    await axios(opts);
  }

  async error(err, message) {
    let embed = this._buildEmbed(err, this.applicationName, message, COLORS.ERROR_RED)
    await this._pushMessage(embed, this.url);
  }

  async info(message) {
    let embed = this._buildEmbed(null, this.applicationName, message)
    await this._pushMessage(embed, this.url);
  }

  async debug(message) {
    let embed = this._buildEmbed(null, this.applicationName, message, COLORS.DEBUG_PURPLE)
    await this._pushMessage(embed, this.url);
  }
}