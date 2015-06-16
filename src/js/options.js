function fetch(storage, cb) {
  storage.sync.get({
    apiId: "",
    apiToken: "",
    showCompletedTasks: false
  }, function (items) {
    cb({
      id: items.apiId,
      token: items.apiToken,
      showCompletedTasks: items.showCompletedTasks
    });
  });
}

export default {
  fetch
};
