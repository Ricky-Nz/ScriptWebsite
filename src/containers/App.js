/**
 * Created by ruiqili on 19/9/15.
 */
import React, { Component, PropTypes } from 'react';

class App extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default App;