class MessageDTO {
  constructor(message) {
    (this.user = message.user), (this.message = message.message);
  }
}

module.exports = MessageDTO;
