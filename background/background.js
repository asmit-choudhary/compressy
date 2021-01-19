console.log("Hey Here I am...");

var display = false;

chrome.browserAction.onClicked.addListener(buttonClicked);


function buttonClicked(tab){
    // console.log(tab);
    display = !display;
    msg = {
        "start" : display
    }
    console.log("\nSending message...");
    chrome.tabs.sendMessage(tab.id, msg);
    console.log("Message sent\n");
}