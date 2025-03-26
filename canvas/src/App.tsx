import "./App.css";

import {
  enableLogging,
  Message,
  MessagePeer,
} from "@amadeus-it-group/microfrontends";

interface SelectMessage extends Message {
  type: "select";
  payload: string;
}
enableLogging(true);

const client = new MessagePeer<SelectMessage>({
  id: "canvas",
  knownMessages: [{ type: "select", version: "1.0" }],
});

client
  .connect("container", {
    window: window.parent,
    origin: "http://localhost:5173",
  })
  .then((res) => {
    console.log("Client", res);
  });

function App() {
  const messageFunction = () => {
    console.log("Client", "Sending Message");
    client.send({
      type: "select",
      version: "1.0",
      payload: "Hello from Canvas",
    });
  };

  return (
    <>
      My Canvas app
      <button onClick={messageFunction}>Send Message</button>
    </>
  );
}

export default App;
