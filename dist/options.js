/*global chrome */

// Saves options to chrome.storage.sync.
function saveOptions() {
  var apiId = document.getElementById("api-id").value;
  var apiToken = document.getElementById("api-token").value;
  var showCompleted = document.getElementById("show-completed").checked;

  chrome.storage.sync.set({
    apiId: apiId,
    apiToken: apiToken,
    showCompletedTasks: showCompleted
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function() {
      status.textContent = "";
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value color = "red" and likesColor = true.
  chrome.storage.sync.get({
    apiId: "",
    apiToken: "",
    showCompletedTasks: false
  }, function(items) {
    document.getElementById("api-id").value = items.apiId;
    document.getElementById("api-token").value = items.apiToken;
    document.getElementById("show-completed").checked = items.showCompletedTasks;
  });
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click",
    saveOptions);
