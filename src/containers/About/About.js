import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';

export default class About extends Component {

  state = {
    showPuppy: false
  }

  handleTogglepuppy = () => this.setState({showPuppy: !this.state.showPuppy});

  render() {
    const {showPuppy} = this.state;
    const puppy = require('./puppy.jpg');
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us"/>

        <p>This project was originally created by Erik Rasmussen
          (<a href="https://twitter.com/erikras" target="_blank">@erikras</a>), but has since seen many contributions
          from the open source community. Thank you to <a
            href="https://github.com/erikras/react-redux-universal-hot-example/graphs/contributors"
            target="_blank">all the contributors</a>.
        </p>

        <h3>Mini Bar <span style={{color: '#aaa'}}>(not that kind)</span></h3>

        <p>Hey! You found the mini info bar! The following component is display-only. Note that it shows the same
          time as the info bar.</p>

        <MiniInfoBar/>

        <h3>Images</h3>

        <p>
          Psst! Would you like to see a puppy?

          <button className={'btn btn-' + (showPuppy ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleTogglepuppy}>
            {showPuppy ? 'No! Take it away!' : 'Yes! Please!'}</button>
        </p>

        {showPuppy && <div><img src={puppy}/></div>}
      </div>
    );
  }
}
