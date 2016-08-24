import React from "react";
import ReactDOM, {render} from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import {deepOrange500, yellow500} from 'material-ui/styles/colors';
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
    console.log(arguments, 'blur');
  };
  handleFocus(event){
    console.log(arguments, 'focus');
  }
  handleTouchTap(event){
    console.log(arguments, 'touchtap');
  }
  render(){
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <IconButton 
          onTouchTap={this.handleTouchTap.bind(this)} 
          onFocus={this.handleFocus.bind(this)} 
          onBlur={this.handleBlur.bind(this)} 
          onKeyboardFocus={this.handleKeyboardFocus.bind(this)}
        >
          click me
          <FontIcon className="material-icons" color={deepOrange500} hoverColor={yellow500}>home</FontIcon>
        </IconButton>
      </div>
      </MuiThemeProvider>
    )
  }
}

injectTapEventPlugin();
render(<IconButtonExampleSimple/>,document.getElementById('app'));