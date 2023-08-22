const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/rest");
async function addReviewersToPr(){
    try{
    const reviewers = core.getInput("reviewers").split(",");
    const token = core.getInput("token");
    const client = new Octokit({auth: token});
    const context = github.context;
    const prAuthor = context.actor;
    const debugMode = (core.getInput('debugMode')==true);
    const owner = context.payload.repository.owner.login ;
    const repo = context.payload.pull_request.base.repo.name;
    const pull_number = context.payload.pull_request.number;
    const finalReviewers = reviewers.filter(reviewer=> reviewer!=prAuthor);
    console.log(finalReviewers);
    
    if(debugMode){
        core.info(`Final reviewers :::${finalReviewers}`);
        core.info(`context::${JSON.stringify(context)}`)
    }
    const parameters = {
        owner  ,
        repo ,
        pull_number,
        reviewers : finalReviewers
     }
     
    await client.rest.pulls.requestReviewers(parameters);
    }
    catch(e){
        core.setFailed(e.message);
    }
}

addReviewersToPr();