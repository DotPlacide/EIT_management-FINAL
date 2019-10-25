import React from 'react';
import ListStuff from '../pages/ListStuff';
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
         </div>
        </footer>
    );
  }
}

export default Footer;
