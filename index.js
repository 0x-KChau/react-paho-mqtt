"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;
exports.parsePayload = parsePayload;

var _react = _interopRequireDefault(require("react"));

var _pahoMqtt = _interopRequireDefault(require("paho-mqtt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function connect(host, port, clientId, onConnectionLost, onMessageArrived) {
  var client = new _pahoMqtt["default"].Client(host, port, clientId); // set callback handlers

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  return client;
} // called when sending a message


function parsePayload(topic, payload, qos, retained) {
  payload = new _pahoMqtt["default"].Message(payload);
  topic ? payload.destinationName = topic : undefined;
  qos ? payload.qos = qos : undefined;
  retained ? payload.retained = retained : undefined;
  return payload;
}
