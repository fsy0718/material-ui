import React from "react";
import ReactDOM, {render} from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from "material-ui/IconButton";
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const muiTheme = getMuiTheme({
    palette: {
    accent1Color: deepOrange500,
  }
})
class IconButtonExampleSimple extends React.Component{
  handleKeyboardFocus(event, keyboardFocused){
    console.log(event.target);
  };
  handleBlur(event){
    console.log(arguments);
  };
  handleFocus(event){
    console.log(arguments, 'focus');
  }
  render(){
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <IconButton iconClassName="muidocs-icon-custom-github" onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} onKeyboardFocus={this.handleKeyboardFocus.bind(this)}>
          click
        </IconButton>
      </MuiThemeProvider>
    )
  }
}
injectTapEventPlugin();
render(<IconButtonExampleSimple/>,document.getElementById('app'));