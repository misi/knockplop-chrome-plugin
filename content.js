/* The chrome content script which can listen to the page dom events */
var channel = chrome.runtime.connect();
channel.onMessage.addListener(function (message) {
    console.log('Knockplop extension channel message', message);
    window.postMessage(message, '*');
});

window.addEventListener('message', function (event) {
    if (event.source != window)
        return;
    if (!event.data && (
			event.data.type == 'getScreen' ||
			event.data.type == 'cancelGetScreen'))
        return;
    channel.postMessage(event.data);
});

var div = document.createElement('div');
div.id = "knockplop-extension-installed";
div.style = "display: none;";
document.body.appendChild(div);
