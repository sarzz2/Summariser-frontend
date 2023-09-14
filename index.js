var paragraph = true;
var length = 2;
var api_url = "http://127.0.0.1:5000/api/summarise/";

// Event Listeners
document.addEventListener("DOMContentLoaded", (event) => {
    // Binding the event listeners with the buttons
    document
        .getElementById("settings-button")
        .addEventListener("click", settings);
    // type of summary listeners
    document
        .getElementById("paragraph")
        .addEventListener("click", summariseType);
    document.getElementById("points").addEventListener("click", summariseType);
    // length of summary listeners
    document.getElementById("short").addEventListener("click", changeLength);
    document.getElementById("medium").addEventListener("click", changeLength);
    document.getElementById("long").addEventListener("click", changeLength);
    // summary button listener
    document.getElementById("summarise").addEventListener("click", summary_url);
    document
        .getElementById("summarise-ai")
        .addEventListener("click", summary_ai_url);
    // copy button listener
    document.getElementById("copy").addEventListener("click", copy);
});

// Check if the clicked element is outside the options box and settings button
document.addEventListener("click", function (event) {
    const optionsBox = document.querySelector(".options-box");
    const settingsButton = document.querySelector("#settings-button");
    if (!optionsBox.contains(event.target) && event.target !== settingsButton) {
        optionsBox.style.display = "none";
    }
});

chrome.storage.local.get("savedText", (data) => {
    const textarea = document.querySelector(".output");
    if (data.savedText) {
        textarea.value = data.savedText;
    }
});

function summary_ai_url() {
    api_url = "http://127.0.0.1:5000/api/ai/summarise/";
    summary();
    snackbar("Summarised using AI");
}

function summary_url() {
    api_url = "http://127.0.0.1:5000/api/summarise/";
    summary();
}

// Summarise the text
function summary() {
    const textarea = document.querySelector(".output");
    // Get the active tab
    try {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                var tab = tabs[0];
                const url = tab.url;
                // Fetch the summary
                try {
                    fetch(
                        `${api_url}?url=${url}&paragraph=${paragraph}&length=${length}`
                    ).then((response) => {
                        // Handle the response for network error
                        if (response.status == 403) {
                            snackbar("Network Error, Please try again later");
                            return;
                            // Handle the response
                        } else if (response.status != 200) {
                            textarea.value = "";
                            snackbar(response.statusText);
                        }
                        response.json().then((data) => {
                            if (
                                !paragraph &&
                                api_url ==
                                    "http://127.0.0.1:5000/api/summarise/"
                            ) {
                                const bulletText = data.summary
                                    .map((item) => `• ${item}`)
                                    .join("\n");
                                textarea.value = bulletText;

                                chrome.storage.local.set(
                                    { savedText: textarea.value },
                                    () => {}
                                );
                            } else {
                                textarea.value = data.summary;

                                chrome.storage.local.set(
                                    { savedText: textarea.value },
                                    () => {}
                                );
                            }
                        });
                    });
                } catch (err) {
                    snackbar(err.message);
                }
            }
        );
    } catch (err) {
        snackbar(err.message);
    }
}

// Display Settings tab
function settings() {
    const optionsBox = document.querySelector(".options-box");
    optionsBox.style.display =
        optionsBox.style.display === "block" ? "none" : "block";
}

// Change the summarise type paragraph/points
function summariseType() {
    var ele = document.getElementById("points");
    if (ele.checked) {
        paragraph = false;
    } else {
        paragraph = true;
    }
}

function changeLength() {
    short = document.getElementById("short");
    medium = document.getElementById("medium");
    long = document.getElementById("long");
    if (short.checked) {
        length = 1;
    } else if (medium.checked) {
        length = 2;
    } else if (long.checked) {
        length = 3;
    }
    console.log(length);
}

// Copy the text to clipboard
function copy() {
    var textarea = document.getElementById("output");
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    snackbar("Copied to clipboard");
}

// Snackbar
function snackbar(message) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";
    x.innerHTML = message;

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}
