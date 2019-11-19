import React from 'react';
import Paho from 'paho-mqtt';

export function connect(host, port, clientId, onConnectionLost, onMessageArrived) {
  const client = new Paho.Client(host, port, clientId);
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  return client;
}

// called when sending a message
export function parsePayload(topic, payload, qos, retained) {
  payload = new Paho.Message(payload);
  topic ? payload.destinationName = topic : undefined;
  qos ? payload.qos = qos : undefined;
  retained ? payload.retained = retained : undefined;
  return payload;
}
