const core = require("@actions/core");
const github = require("@actions/github");

async function addReviewersToPr(){
    try{
    const reviewers = core.getInput("reviewers").split(",");
    const token = core.getInput("token");
    const prAuthor = github.context.payload.user.login;
    const context = github.context;
    const client = new github.getOctokit(token);
    const finalReviewers = reviewers.filter(reviewer=> reviewer!=prAuthor);
    const debugMode = (core.getInput('debugMode')==true);
    console.log(finalReviewers);

    if(debugMode){
        core.info(`Final reviewers :::${finalReviewers}`);
    }
    const parameters = {
        ...context.repo ,
        pr_number : context.payload.pull_request.number,
        reviewers : finalReviewers
     }
     
    await client.pulls.requestReviewers(parameters);
    }
    catch(e){
        core.setFailed(e.message);
    }
}

addReviewersToPr();