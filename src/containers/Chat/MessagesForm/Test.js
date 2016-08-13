import React from 'react';

const Test = function({handle}){
        console.dir({handle});
        return (<h1>Working</h1>);
}

Test.propTypes = {
  handle: React.PropTypes.func.isRequired,
}
export default Test;