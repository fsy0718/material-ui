import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";

import injectTapEventPlugin from "react-tap-event-plugin";

import RaisedButton from "material-ui/RaisedButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Popover from "material-ui/Popover";


const muiTheme = getMuiTheme();


class PopoverExampleSimple extends Component {
  state = {
    open: false
  }
  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }
  handlePopoverClose = () => {
    this.setState({
      open: false
    })
  }
  render(){
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
      <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Click me"
        />
      <Popover
        open={this.state.open}
        onRequestClose={this.handlePopoverClose}
        anchorEl = {this.state.anchorEl}
        useLayerForClickAway={false}
        anchorOrigin = {{"horizontal":"left","vertical":"top"}}
        targetOrigin= {{"horizontal":"middle","vertical":"center"}}
      >
        Popover
      </Popover>
      </div> 
      </MuiThemeProvider>
    )
  }
}
injectTapEventPlugin()
render(
  <div>
    <PopoverExampleSimple />
    <PopoverExampleSimple />
  </div>
  ,document.querySelector('#app')
);

