import React from 'react';

const MessagesForm = ({handleSubmit, handleOnChange, message}) => {
  const style = require('./MessagesForm.scss');
  return (
    <form className={style.msgform} onSubmit={handleSubmit}>
        <div className={style.fluidformwrapper + ' container'}>
          <input type="text" ref="message" placeholder="Enter your message"
          value={message}
          onChange={handleOnChange}/>
          <button className="btn" onClick={handleSubmit}>Send</button>
        </div>
    </form>
  );
};

MessagesForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleOnChange: React.PropTypes.func.isRequired,
  message:React.PropTypes.string
};

export default MessagesForm;
