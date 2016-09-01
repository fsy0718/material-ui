import React, {Component} from "react";
import ReactDOM, {render} from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import Datepicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import {deepOrange500, yellow500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
    palette: {
    accent1Color: deepOrange500,
  }
})

//高阶函数，返回一个新组件
const DatepickerExample = (props) => {
  const {defaultDate, value, ...others} = props;

  return (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>

      <Datepicker name="test-date-picker" defaultDate={defaultDate}/>
      <TextField name="test-text-field" defaultValue="test" multiLine={true} style={{width: '100%'}}  shadowStyle={{border: '1px solid red'}}/>
      <TextField name="test-text-field" value="test" floatingLabelText="test" />
      <TextField name="test-text-field-child">
        <span>child</span>
      </TextField>
    </div>
  </MuiThemeProvider>
  )
}

//从Component中继承出一个新组件
class DatePickerClass extends Component {
  onTouchTap = () => {
    //触发DatePicker的focus方法
    console.log(this.refs.datepicker.focus());
  }
  render(){
    const {defaultDate} = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Datepicker ref="datepicker" name="test-date-picker" defaultDate={defaultDate}/>
          <FlatButton label="trigger datepicker" onTouchTap={this.onTouchTap}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

injectTapEventPlugin();
render(
  <div>
    <DatepickerExample defaultDate={new Date()}/>
    <DatePickerClass defaultDate={new Date()}/>
  </div>
  ,document.querySelector('#app')
);
console.log(111);