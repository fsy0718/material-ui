import React, {Component} from "react";
import ReactDOM, {render} from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import Datepicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {deepOrange500, yellow500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
    palette: {
    accent1Color: deepOrange500,
  }
})


class DialogExample extends Component {
  state = {
    open: false
  }
  handleTouchTap = () => {
    this.setState({
      open: true
    })
  };
  handleDialogClose = () => {
    console.log(arguments);
    this.setState({
      open: false
    })
  }
  render(){
    const actions = [
      <FlatButton label="close" onTouchTap={this.handleDialogClose}/>
    ]
    const childs = new Array(50).fill(1).map(function(a,b){
      return <p key={b}>{b}</p>
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <FlatButton label="dialog" onTouchTap={this.handleTouchTap}/>
        <Dialog 
          title="测试标签" 
          open={this.state.open} 
          actions={actions} 
          actionsContainerClassName="test-dialog"
          autoScrollBodyContent={true}
          autoDetectWindowHeight={false}
          bodyClassName="test-body"
          className="test-root"
          contentClassName="test-content"
          overlayClassName="test-overlay"
          titleClassName="test-title"
          onRequestClose={this.handleDialogClose}
        >
          {childs}
        </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

class DialogExampleWithDatePicker extends Component {
  state = {
    open: false
  }
  handleTouchTap = () => {
    this.setState({
      open: true
    })
  }
  handleDialogClose = () => {
    this.setState({
      open: false
    })
  }
  handleDialogConfirm = ()=>{
    this.setState({
      open: false
    });
    console.log(this.refs.datepicker.state.date);
  }
  render(){
    const {defaultDate, ...other} = this.props;
    const actions = [
      <FlatButton label="确认" onTouchTap={this.handleDialogConfirm}/>
    ]
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
      <FlatButton label="dialog" onTouchTap={this.handleTouchTap} />
      <Dialog
        title="选择日期"
        open={this.state.open}
        actions={actions}
        onRequestClose={this.handleDialogClose}
      >
        <Datepicker ref="datepicker" defaultDate={defaultDate} name="test-dialog-input"/>
      </Dialog>
      </div>
      </MuiThemeProvider>
    )  
  }
}


class DialogExampleWithAddLineWithoutHighComponents extends Component {
  handleDialogClose = () => {
    this.setState({
      open: false
    })
  }
  handleDialogOpen = () => {
    this.setState({
      open: true
    })
  }
  handleDialogAddLine = () => {
    let word = (Math.random() * 1000000).toFixed(0).toString(16);
    this.setState({
      words: this.state.words.concat(word)
    })
  }

  state = {
    open: false,
    words: []
  }
  render(){
    const actions = [
      <FlatButton label="确认" onTouchTap={this.handleDialogClose}/>,
      <FlatButton label="增加一行" onTouchTap={this.handleDialogAddLine}/>
    ]
    const childrens = this.state.words.map(function(word,idx){
      return <p key={idx}>{word}</p>
    })
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <FlatButton label="打开非High-Components的dialog" onTouchTap={this.handleDialogOpen}/>
        <Dialog 
          title="自动增加一行 非High-Components"
          onRequestClose={this.handleDialogClose}
          actions={actions}
          open={this.state.open}
          /*repositionOnUpdate = {false}*/
        >
          {childrens}
        </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

function BaseDialogExample(props={}, Comp){
  class DialogBase extends Component {
    state = {
      open: false
    }
    handleTouchTap = () => {
      this.setState({
        open: true
      })
    }
    handleDialogClose = ()=>{
      this.setState({
        open: false
      })
    }
    render(){
      const {title,actions, ...other}  = props
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <FlatButton ref="btn" label="dialog" onTouchTap={this.handleTouchTap}/>
            <Dialog
              ref="dialog"
              open={this.state.open}
              onRequestClose={this.handleRequestClose}
              title={title}
              actions={actions}
              {...other}
            >
            <Comp context={this}/>
            </Dialog>

          </div>
        </MuiThemeProvider>
      )
    }
  }
  return DialogBase;
}
/* 想要repositionOnUpdate生效，必须要在同一个组件内，因为触发机制是ComponentDidUpdate，不能用High-Components
const actionsWithAddLine = [
  <FlatButton label="确定" onTouchTap={console.log(this)}/>
]
class DialogExampleWithAddLineChildren extends Component {
  state = {
    words : []
  }
  handleTouchTap = ()=>{
    let word = (Math.random() * 100000000).toFixed(0).toString(16);
    this.setState({
      words : this.state.words.concat(word)
    })
    //this.props.context.refs.dialog.positionDialog();
  }
  render(){
    let children = this.state.words.map(function(word,index){
      return <p key={index}>{word}</p>
    })
    return (
      <div>
        <FlatButton label="增加一行" onTouchTap={this.handleTouchTap}/>
        {children}
      </div>
    )
  }
}
const DialogExampleWithAddLine = BaseDialogExample({
  title: '自动增加行',
  actions: actionsWithAddLine
}, DialogExampleWithAddLineChildren)*/




injectTapEventPlugin();
render(
  <div>
    <DialogExample />
    <DialogExampleWithDatePicker defaultDate={new Date()}/>
    <DialogExampleWithAddLineWithoutHighComponents />
  </div>
  ,document.querySelector('#app')
);