import React from 'react';

const MessagesBox = ({messages, user}) => {
  const style = require('./MessagesBox.scss');
  return (
    <ul className={style.messages + ' clearfix'}>
        {messages.map((msg) => {
          return (
            <li className={(msg.from === user.name) ? style.left : style.right} key={`chat.msg.${msg.id}`}>
            <span aria-hidden="true" className={style.msgtitle}>
            <i className="fa fa-smile-o"></i>
            {msg.from}
            </span>
            <span className={style.msgbody}>{msg.text}</span>
            </li>
          );
        })}
    </ul>
  );
};

MessagesBox.propTypes = {
  messages: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired
};

export default MessagesBox;
