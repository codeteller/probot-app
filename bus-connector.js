const { ServiceBusClient } = require("@azure/service-bus");

async function busConnector(message, queueName) {

    const connectionString = "Endpoint=sb://buscheck.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=rzDh8Xfn/FKTFUD7dituxxiVMbanr1hjYPuJ0/YkgjM="

    // create a Service Bus client using the connection string to the Service Bus namespace
    const sbClient = new ServiceBusClient(connectionString);

    // createSender() can also be used to create a sender for a topic.
    const sender = sbClient.createSender(queueName);

    try{
        await sender.sendMessages(message);
        await sender.close();
    } catch(err){
        console.log(err)
    } finally{
        await sbClient.close();
    }
}

// cannot use export async function because we are using CommonJsModule syntax

module.exports =   { busConnector };