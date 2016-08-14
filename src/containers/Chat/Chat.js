import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import MessageBox from './MessagesBox/MessagesBox';
import {PWords} from './PWords';

@connect(
  state => ({user: state.auth.user})
)
export default class Chat extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  state = {
    message: '',
    messages: []
  };

  componentDidMount() {
    const windowheight = parseInt(window.innerHeight, 10) - 50;

    if (socket) {
      socket.on('msg', this._onMessageReceived);
      setTimeout(() => {
        socket.emit('history', {offset: 0, length: 100});
      }, 100);
    }

    // Adjust to chat area height to window height
    document.getElementById('message-outter-container').style.height = String(windowheight) + 'px';
    document.getElementById('message-inner-container').style.height = document.getElementById('message-outter-container').style.height;
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('msg', this._onMessageReceived);
    }
  }

  _onMessageReceived = data => {
    const messages = this.state.messages;
    messages.push(data);
    this.setState({messages});
  }

  _handleSubmit = event => {
    event.preventDefault();

    const msg = this.state.message;

    this.setState({message: ''});

    socket.emit('msg', {
      from: this.props.user.name,
      text: msg
    });
  }

  _handleOnChange = event => {
    const msg = this.__runMesssgeFilters(event.target.value);
    return this.setState({message: msg});
  }

  __runMesssgeFilters = msg => this.__messageFilter(this.__emotesFilter(msg));

  __messageFilter = msg => {
    // Could be abstracted somewhere as a configuration file
    const profanityWords = PWords;
    let finalMsg = msg;
    profanityWords.forEach(value => {
      if (value === msg) {
        finalMsg = '#&*#&%';
      }
    });
    return finalMsg;
  }

  __emotesFilter = msg => {
    if (msg === '/me') {
      return '* ' + this.props.user.name;
    }
    return msg;
  }

  render() {
    const style = require('./Chat.scss');
    const {user} = this.props;

    return (
      <div className={style.chat}>
        {user &&
        <div id="message-outter-container" className={style.outter}>
          <div id="message-inner-container" className={style.inner + ' container'}>
            <MessageBox messages={this.state.messages} user={user}/>
          </div>
          <form className={style.msgform} onSubmit={this._handleSubmit}>
            <div className={style.fluidformwrapper + ' container'}>
              <input type="text" ref="message" placeholder="Enter your message"
              value={this.state.message}
              onChange={this._handleOnChange}/>
              <button className="btn" onClick={this._handleSubmit}>Send</button>
            </div>
          </form>
        </div>
        }
      </div>
    );
  }
}
