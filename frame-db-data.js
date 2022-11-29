const moment = require('moment')

const dateTimeFormat = 'YYYY-MM-DD hh:mm:ss';

function pushEventData(payload){
    let dbData = {};
    dbData.orgId = payload.organization.id;
    dbData.repoId = payload.repository.id;
    dbData.eventId = payload.head_commit.id;
    dbData.eventTypeId = 1;
    creationTime = moment(payload.head_commit.timestamp).format(dateTimeFormat);
    dbData.timeCreated = creationTime;
    dbData.payloadValue = {"message": payload.head_commit.message};
    //console.log(dbData);
    return dbData;
}

// pull_request : open

function pullRequestOpen(payload, commitsArray) {
    let dbData = {};
    dbData.orgId = payload.organization.id;
    dbData.repoId = payload.repository.id;
    dbData.eventId = payload.pull_request.id;
    dbData.eventTypeId = 5;
    creationTime = moment(payload.pull_request.created_at).format(dateTimeFormat);
    dbData.timeCreated = creationTime;
    // framing payload
    dbData.payload = {
        'number': payload.number,
        'head': payload.pull_request.head.sha,
        'base': payload.pull_request.base.sha,
        'commits': commitsArray
    }
    return dbData;

}

// pull_request : merged

function pullRequestClosed(payload) {
    let dbData = {};
    dbData.orgId = payload.organization.id;
    dbData.repoId = payload.repository.id;
    dbData.eventId = payload.pull_request.id;
    dbData.eventTypeId = 6;
    dbData.timeCreated = null;
    //framing payload
    dbData.payload = {
        'merged_at': payload.pull_request.merged_at,
        'comments': payload.pull_request.comments,
        'review_comments': payload.pull_request.review_comments
    }
    return dbData;
}

// pull_request_review : submitted

function pullRequestReview(payload) {
    let dbData = {};
    dbData.orgId = payload.organization.id;
    dbData.repoId = payload.repository.id;
    dbData.eventId = payload.review.id;
    dbData.eventTypeId = 2;
    creationTime = moment(payload.review.submitted_at).format(dateTimeFormat);
    dbData.timeCreated = creationTime;
    dbData.payload = {
        'pull_request_id': payload.pull_request.id
    }
    return dbData;
}

// check_run : completed

function check_run(payload) {
    let dbData = {};
    dbData.orgId = payload.organization.id;
    dbData.repoId = payload.repository.id;
    dbData.eventId = payload.check_run.id;
    dbData.eventTypeId = 3;
    creationTime = moment(payload.check_run.started_at).format(dateTimeFormat);
    dbData.timeCreated = creationTime;
    dbData.payload = {
        'head_sha' : payload.head_sha.sha, 
        'name' : payload.check_run.name,
        'time_completed' : payload.check_run.completed_at,
        'status' : payload.check_run.status
    }
    return dbData;
}

// status

function status(payload) {
    let dbData = {};
    dbData.orgId = payload.organization.id;
    dbData.repoId = payload.repository.id;
    dbData.eventId = payload.check_run.id;
    dbData.eventTypeId = 4;
    creationTime = moment(payload.updated_at).format(dateTimeFormat);
    dbData.timeCreated = creationTime;
    dbData.payload = {
        'sha': payload.sha,
        'name': payload.context,
        'status': payload.state
    }
    return dbData;
}

// release


module.exports = { pushEventData, pullRequestOpen, pullRequestClosed, pullRequestReview, check_run, status }
