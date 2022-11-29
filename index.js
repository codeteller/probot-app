/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const db = require("./db-connect")

const frameData = require("./frame-db-data")

const {busConnector}  = require("./bus-connector")

//context.octokit is an instance of the @octokit/rest Node.js module, and allows you to do almost anything programmatically that you can do through a web browser.

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue hello!",
    });
    const { payload } = context;
    const message = [
      {
        "body": payload
      }
    ];
    await busConnector(message, "commit");
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("push", async (context) => {

    const { payload } = context;
    //console.log(payload);
    // console.log('In push!');
    // await console.info("Hellooooooo");
    // await console.info(payload);
    var dbData = frameData.pushEventData(payload);
    console.log(dbData);
    // Have one table for Source and Eventtype values
    //var query = `INSERT INTO PUSH (EventName, EventId, Source, EventType, TimeCreated, Payload) values('${dbData.eventName}', '${dbData.eventId}', 1, 1, '${dbData.timeCreated}', '${dbData.payloadValue}')`;
    //console.log(query)
    //await db.connectAndQueryDb(query);
    app.log.info("A push has been made to the repository!");
    return;

  });

  // Just changing the code is not changing the settings. We have to change the access settings from the app settings!
  // permission and subscribe
  // Then you have to review and allow those permissions!
  // How to define it in default?
  // Is changing in app.yml will do that?

  //In package.json we have no type. Hence this app is of CJS format and not module format
  app.on("pull_request.opened", async (context) => {

    // getting list of commits

    const { payload } = context;
    //console.log(payload);
    //console.log(payload._links.commits)
    //console.log(context);

    // gets data of pull requests

    //   const { data: pullRequest } = await context.octokit.pulls.get({
    //     owner: payload.repository.owner.login,
    //     repo: payload.repository.name,
    //     pull_number: payload.number,
    // });

    // gets list of commits
    const { data: commits } = await context.octokit.pulls.listCommits({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      pull_number: payload.number,
    });

    let commitsArray = new Array();

    for (const commit of commits) {
      commitsArray.push(commit.sha);
    }
    // console.log(commitsArray);
    // //console.log(pullRequest);
    // console.log('####');
    // console.log(commits);
    var dbData = frameData.pullRequestOpen(payload, commitsArray);
    app.log.info("Following is pull request open data!");
    console.log(dbData);
    return;
  });

  // pull request closed
  app.on("pull_request.closed", async (context) => {

    const { payload } = context;
    //console.log(payload);
    if (payload.pull_request.merged) {
      var dbData = frameData.pullRequestClosed(payload);
      console.log("Following is the pull request merged data");
      console.log(dbData);
    }
    return;
  });

  // pull request review
  app.on("pull_request_review.submitted", async (context) => {

    const { payload } = context;
    //console.log(payload);
    var dbData = frameData.pullRequestReview(payload);
    console.log("Following is the pull request review data");
    console.log(dbData);
    return;
  });
  
    // check_run

  app.on("check_run.completed", async (context) => {

    const {payload} = context;
    var dbData = checkRun(payload);
    console.log("Following is the check_run data")
    console.log(dbData);
    return;
  });

  app.on("status", async (context) => {
    
    const { payload } = context;
    var dbData = status(payload);
    console.log("Following data is from status event");
    console.log(dbData);
    return;
  });

  // status

  // release

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
