// Get config from import params
const url = new URL(import.meta.url);
const config = {
  rewardTitle: url.searchParams.get('rewardTitle'),
  imageUrl: url.searchParams.get('imageUrl'),
  seconds: Number(url.searchParams.get('seconds')) || 5 // default to 5 seconds
}
// Will subscribe to these events, mapped directly to the websocket subscription request.
window.streamerbot.subscribeTo({
  Twitch: [ "RewardRedemption" ]
});
// Called when any event is received from Streamerbot, including those subscribed to by other scripts.
window.streamerbot.onMessage(message => {
  if (
    message.event.source === "Twitch" &&
    message.event.type === "RewardRedemption" &&
    message.data.title === config.rewardTitle
  ) {
    showImage();
  }
});
function showImage() {
  // Create our image element
  const imgElement = document.createElement("img");

  // Modify the image element src to point at the configured image URL
  imgElement.src = config.imageUrl;

  // Append the image element to the HTML document
  document.body.appendChild(imgElement);

  // Set a timeout to remove the image after the configured amount of time
  setTimeout(() => {
    imgElement.remove();
  }, config.seconds * 1000)
}