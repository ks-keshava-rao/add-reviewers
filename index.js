const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/rest");
async function addReviewersToPr(){
    try{
    const reviewers = core.getInput("reviewers").split(",");
    const token = core.getInput("token");
    core.info(`token is ::: ${token}`);
    const client = new Octokit({auth: token});
    const context = github.context;
    core.info(`context::${context}`)
    const prAuthor = context.payload.user.login;
    core.info("prauth "+prAuthor)
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
     
    await client.rest.pulls.requestReviewers(parameters);
    }
    catch(e){
        core.setFailed(e.message);
    }
}

addReviewersToPr();