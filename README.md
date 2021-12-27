# GitHub Unwrapped

https://githubunwrapped.com

Generates a video for each GitHub user.

## Setup

1. Run `yarn` to install dependencies.
2. Rename `.env.example` to `.env`
3. Set up your AWS account according to the [Remotion Lambda Setup guide](https://v3.remotion.dev/docs/lambda/setup).
   - Use `AWS_KEY_1` instead of `REMOTION_AWS_ACCESS_KEY_ID` and `AWS_SECRET_1` instead of `REMOTION_AWS_SECRET_ACCESS_KEY`.
   - You can use `AWS_KEY_2` and `AWS_SECRET_2` to load-balance between two accounts, or paste the same credentials as before to use the same account.
4. Deploy the functions into your AWS account(s):
   ```
   REMOTION_AWS_ACCESS_KEY_ID=<id> REMOTION_AWS_SECRET_ACCESS_KEY=<secret> sh deploy.sh
   ```
5. Create a Slackbot Token: https://your-team.slack.com/services/new/slackbot to get notified when a new video gets rendered (may become verbose, tweak the code to adjust when Slack notifications are sent or remove it). Set it as `SLACK_TOKEN`. You can also remove it entirely
6. For caching the videos and GitHub API responses, set up a MongoDB (I use a free MongoDB Atlas Cloud instance) to save the videos. Set the connection string as `MONGO_URL`
7. For fetching data from GitHub, create a personal access token in your user settings and set it as `GITHUB_TOKEN`.

You now have all environment variables.

You can run the app with `npm run dev`, edit the video using `npm run preview`, and deploy it for example to Vercel or Heroku (don't forget to also set the environment variables there too).
