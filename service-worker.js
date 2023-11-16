// service-worker.js

async function onStartWindow() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions); 
    //console.log(`Command: ${command} from ${tab.windowId},${tab.index}`);
	const response = await chrome.tabs.sendMessage(tab.id, {command: "start-window"});
	//console.log(response);
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command==='start-window') {  
    onStartWindow()
  }
});
