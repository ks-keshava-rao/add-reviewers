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
    const prAuthor = context.actor;
    core.info("prauth "+prAuthor)
    const debugMode = (core.getInput('debugMode')==true);

    const finalReviewers = reviewers.filter(reviewer=> reviewer!=prAuthor);
    console.log(finalReviewers);
    
    if(debugMode){
        core.info(`Final reviewers :::${finalReviewers}`);
    }
    const parameters = {
        owner: context.repository_owner ,
        repo: context.event.pull_request.base.repo.name,
        pull_number : context.event.pull_request.number,
        reviewers : finalReviewers
     }
     
    await client.rest.pulls.requestReviewers(parameters);
    }
    catch(e){
        core.setFailed(e.message);
    }
}

addReviewersToPr();