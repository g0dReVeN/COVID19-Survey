const { CloudTasksClient } = require("@google-cloud/tasks");

const client = new CloudTasksClient();

// const project = 'totemic-winter-274612';
// const queue = 'coughstudy-queue';
// const location = 'europe-west2';

const parent = client.queuePath(process.env.GOOGLE_CLOUD_PROJECT, process.env.GCLOUD_TASK_QUEUE_LOCATION, process.env.GCLOUD_TASK_QUEUE);

const createTask = (payload) => {
    const task = {
        appEngineHttpRequest: {
          httpMethod: 'POST',
          appEngineRouting: {
            service : 'task-handler'
          },
          relativeUri: '/',
          body: Buffer.from(JSON.stringify(payload)).toString('base64')
        },
    };

    const request = {
        parent: parent,
        task: task,
    };

    client.createTask(request);
}

module.exports = createTask;