# @sequenia/socket-action-cable

> library for rails action cable

[![NPM](https://img.shields.io/npm/v/@sequenia/socket-action-cable.svg)](https://www.npmjs.com/package/@sequenia/socket-action-cable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @sequenia/socket-action-cable
```

## Usage

```jsx
import ActionCable from '@sequenia/socket-action-cable'

/* create socket connection */
const url = "wss://url-path-to-somewhere";
const ActionCableInstance = new ActionCable(url)

/* subscribe to channel: channell name, params and onMessage channel callback function */
ActionCableInstance.subscribe("ExampleChannel", {foo: "bar", bar: "buzz"}, message => message)

/* unsubscribe */
ActionCableInstance.unsubscribe("ExampleChannel")

/* get readyState of socket connection */
const readyState = ActionCableInstance.readyState

/* get buffered amount of socket connection */
const bufferedAmount = ActionCableInstance.bufferedAmount

/* close connection */
ActionCableInstance.close()

/* onError socket connection callback */
ActionCableInstance.onErrorCallback((event) => { ... })

/* onClose socket connection callback */
ActionCableInstance.onClose((event) => { ... })
```

## License

MIT © [sequenia](https://github.com/sequenia)
