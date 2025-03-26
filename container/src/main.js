import "./style.css";
import { enableLogging, MessagePeer } from "@amadeus-it-group/microfrontends";

// uncomment for debugging messages from lib
//enableLogging(true)
// Message types are optional
const container = new MessagePeer({
  id: "container",
  onMessage: (message) => {
    //here you can handle the messages received from the iframe
    // switch (message.type) {
    //     case 'select':
    //         console.log('From canvas in the container', message)
    //         break;
    //     default:
    //         console.log('From canvas in the container', message)
    // }

    console.log("From canvas in the container", message);
  },
  knownMessages: [{ type: "select", version: "1.0" }],
});
const iframe = document.querySelector("iframe#canvas");
// You should check that there is one connection and then send the data
container
  .listen("canvas", {
    window: iframe.contentWindow,
    //url of the iframe => careful no trailing slash
    origin: "http://localhost:3030",
  })
  .then((res) => {
    console.log("result listen", res);
  });

document.querySelector("button#button").addEventListener("click", (e) => {
  container.disconnect();
});

document.querySelector("button#log").addEventListener("click", (e) => {
  console.log(container.knownPeers);
});
