const moment = require('moment')

const dateTimeFormat = 'YYYY-MM-DD hh:mm:ss';
// frame json for event Types

function pushEventData(payload) {
    let dbData = {};
    dbData.eventName = payload.repository.full_name;
    dbData.eventId = payload.head_commit.id;
    dbData.eventType = 1;
    creationTime = moment(payload.head_commit.timestamp).format(dateTimeFormat);
    dbData.timeCreated = creationTime;
    dbData.payloadValue = { 'message': payload.head_commit.message };
    return dbData;
}

// Framing data for even when pull request opens
function pullRequestOpen(payload, commitsArray) {
    let dbData = {};
    dbData.eventName = payload.repository.full_name;
    dbData.eventId = payload.pull_request.id;
    dbData.eventType = 5;
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

function pullRequestClosed(payload) {
    let dbData = {};
    dbData.eventName = payload.repository.full_name;
    dbData.eventId = payload.pull_request.id;
    dbData.eventType = 6;
    dbData.timeCreated = null;
    //framing payload
    dbData.payload = {
        'merged_at': payload.pull_request.merged_at,
        'comments': payload.pull_request.comments,
        'review_comments': payload.pull_request.review_comments
    }
    return dbData;
}

function pullRequestReview(payload) {
    let dbData = {};
    dbData.eventName = payload.repository.full_name;
    dbData.eventId = payload.review.id;
    dbData.eventType = 2;
    creationTime = moment(payload.review.submitted_at).format(dateTimeFormat);
    dbData.timeCreated = creationTime;
    dbData.payload = {
        'pull_request_id': payload.pull_request.id
    }
    return dbData;
}


exports.pushEventData = pushEventData;
exports.pullRequestOpen = pullRequestOpen;
exports.pullRequestClosed = pullRequestClosed;
exports.pullRequestReview = pullRequestReview;