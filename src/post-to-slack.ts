// @ts-expect-error
import Slackbot = require("slackbot");

export const slackbot = new Slackbot("hackercompany", process.env.SLACK_TOKEN);
