import React, { Component, PropTypes } from 'react';
import { Styles } from 'material-ui';

class ThemeContainer extends Component {
    getChildContext() {
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme),
        };
    }
}

ThemeContainer.childContextTypes = {
    muiTheme: PropTypes.object,
};

export default ThemeContainer;