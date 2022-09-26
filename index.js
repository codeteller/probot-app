/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue hello!",
    });
    app.log.info("In issue opening block! YAY!");
    return context.octokit.issues.createComment(issueComment);
  });
  
  app.on("push", async (context) => {
    
    const { payload } = context;
    await console.log(payload);
    console.log('In push!');
    app.log.info("A push has been made to the repository!");
    return;

  });
  
  // Just changing the code is not changing the settings. We have to change the access settings from the app settings!
  // permission and subscribe
  // Then you have to review and allow those permissions!
  // How to define it in default?
  // Is changing in app.yml will do that?
  app.on("pull_request", async (context) => {
    
    app.log.info("A commit has been made to the repository!")
    return;
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
