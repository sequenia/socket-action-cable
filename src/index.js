class ActionCable {

  constructor(url) {
    this.url = url
    this.socket = new WebSocket(this.url)
    this.socket.onopen = () => {
      for (let item in this.channelCallbacks) {
        const name = this.channelCallbacks[item].name
        const params = this.channelCallbacks[item].params
        const callback = this.channelCallbacks[item].callback

        this.subscribe(name, params, callback)
      }
    } 
    this.socket.onmessage = event => {
      const data = JSON.parse(event.data)
      const identifier = data.identifier ? JSON.parse(data.identifier) : ""
      if (identifier.channel && data.message) {
        this.channelCallbacks[identifier.channel].callback(data.message)
      }
    }  
  }

  sendMessage(msg) {
    if (this.socket.readyState === 1) {
      this.socket.send(JSON.stringify(msg))
    }
  }

  subscribe(channelName, params, channelListener) {
    this.channelCallbacks = {
      ...this.channelCallbacks,
      [channelName]: {
        name: channelName,
        callback: channelListener,
        params
      }
    }

    const subscribeMsg = (channelName, params) => {
      return {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: channelName,
          ...params
        })
      }
    };

    this.sendMessage(subscribeMsg(channelName, params))
  }

  unsubscribe(channelName) {
    const msg = {
      command: 'unsubscribe',
      identifier: JSON.stringify({
        channel: channelName
      }),
    };

    this.sendMessage(msg)
  }

  close(code = undefined, reason = undefined) {
    this.socket.close(code, reason)
  }
  
  onCloseCallback(callback) {
    this.socket.onclose = callback
  }

  onErrorCallback(callback) {
    this.socket.onerror = callback
  }

  get readyState() {
    return this.socket.readyState
  }

  get bufferedAmount() {
    return this.socket.bufferedAmount
  }
}

export default ActionCable