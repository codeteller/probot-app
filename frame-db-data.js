const moment = require('moment')

const dateTimeFormat = 'YYYY-MM-DD hh:mm:ss';

function pushEventData(payload){
    let dbData = {};
    dbData.eventName = payload.repository.full_name;
    dbData.eventId = payload.head_commit.id;
    dbData.source = 1;
    dbData.eventType = 1;
    creationTime = moment(payload.head_commit.timestamp).format(dateTimeFormat);
    dbData.timeCreated = creationTime;
    dbData.payloadValue = payload.head_commit.message;
    //console.log(dbData);
    return dbData;
}

exports.pushEventData = pushEventData;