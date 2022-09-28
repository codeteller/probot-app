/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const db = require("./db-connect")

const frameData = require("./frame-db-data")

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue hello!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("push", async (context) => {

    const { payload } = context;
    console.log(payload);
    // console.log('In push!');
    // await console.info("Hellooooooo");
    // await console.info(payload);
    var dbData = frameData.pushEventData(payload);
    console.log(dbData);
    // Have one table for Source and Eventtype values
    var query = `INSERT INTO PUSH (EventName, EventId, Source, EventType, TimeCreated, Payload) values('${dbData.eventName}', '${dbData.eventId}', 1, 1, '${dbData.timeCreated}', '${dbData.payloadValue}')`;
    console.log(query)
    await db.connectAndQueryDb(query);
    app.log.info("A push has been made to the repository!");
    return;

  });

  // Just changing the code is not changing the settings. We have to change the access settings from the app settings!
  // permission and subscribe
  // Then you have to review and allow those permissions!
  // How to define it in default?
  // Is changing in app.yml will do that?

  //In package.json we have no type. Hence this app is of CJS format and not module format
  app.on("pull_request", async (context) => {

    app.log.info("A commit has been made to the repository!")
    return;
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
