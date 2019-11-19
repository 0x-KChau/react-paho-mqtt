This package is a simple paho-mqtt wrapper in React. For more detail of paho-mqtt, please refer to this [paho-mqtt github page](https://github.com/eclipse/paho.mqtt.javascript#readme).

## Get Started

### Installation

#### npm

`npm install react-paho-mqtt`

#### yarn

`yarn add react-paho-mqtt`


## Example Usage

```
import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as mqtt from 'react-paho-mqtt';

function App() {
  const [ client, setClient ] = React.useState(null);
  const _topic = ["Hello"];
  const _options = {};

  React.useEffect(() => {
    _init();
  },[])

  const _init = () => {
    const c = mqtt.connect("test.mosquitto.org", Number(8081), "mqtt", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    setClient(c);
  }

  // called when sending payload
  const _sendPayload = () => {
    const payload = mqtt.parsePayload("Hello", "World"); // topic, payload
    client.send(payload);
  }

  // called when client lost connection
  const _onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  }

  // called when messages arrived
  const _onMessageArrived = message => {
    console.log("onMessageArrived: " + message.payloadString);
  }


  // called when subscribing topic(s)
  const _onSubscribe = () => {
    client.connect({ onSuccess: () => {
      for (var i = 0; i < _topic.length; i++) {
        client.subscribe(_topic[i], _options);
      }}
    }); // called when the client connects
  }

  // called when subscribing topic(s)
  const _onUnsubscribe = () => {
    for (var i = 0; i < _topic.length; i++) {
      client.unsubscribe(_topic[i], _options);
    }
  }

  // called when disconnecting the client
  const _onDisconnect = () => {
    client.disconnect();
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          style={{ color: 'white' }}
          onClick={_onSubscribe}>
          <h1>Subscribe Topic</h1>
        </button>
        <button
          style={{ color: 'white' }}
          onClick={_sendPayload}>
          <h1>Send Message</h1>
        </button>
      </header>
    </div>
  );
}

export default App;

```

## Learn More

**Note: The above example uses the Mosquitto broder/server**

If you want to run your own localhost MQTT broker, you can use Mosquitto or Mosca, to launch your own broker. Remember to change the host, port and clientId to your localhost server respectively.


## API

### mqtt.connect(host, port, clientId, onConnectionLost, onMessageArrived)

* host: string
* port: number
* clientId: string
* onConnectionLost: function
* onMessageArrived: function

### mqtt.parsePayload(topic, payload, qos, retained)

* topic: [string]
* payload: string
* qos?: number
* retained?: boolean

### client.subscribe(topic(s), options={})

* topic: [string]
* options?: qos || onSuccess || onFailure || timeout

### client.unsubscribe(topic(s), options={})

* topic: [string]
* options?: qos || onSuccess || onFailure || timeout

### client.publish(payload)

* payload: string

### client.send(payload)

* payload: string

### client.disconnect()
