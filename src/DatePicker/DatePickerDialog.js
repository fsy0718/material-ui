import React, {Component, PropTypes} from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Calendar from './Calendar';
import Dialog from '../Dialog';
import Popover from '../Popover/Popover';
import PopoverAnimationVertical from '../Popover/PopoverAnimationVertical';
import {dateTimeFormat} from './dateUtils';

/**
 * @desc requires {@link React~Component} | {@link keycode} | {@link Calendar} | {@link Dialog} | {@link Popover} | {@link PopoverAnimationVertical} | dateUtils {@link dateTimeFormat}
 * @class DatePickerDialog
 * @extends {Component}
 */
class DatePickerDialog extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func,
    animation: PropTypes.func,
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    container: PropTypes.oneOf(['dialog', 'inline']),
    containerStyle: PropTypes.object,
    disableYearSelection: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    initialDate: PropTypes.object,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    okLabel: PropTypes.node,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
    open: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    style: PropTypes.object,
    wordings: PropTypes.object,
  };

  static defaultProps = {
    DateTimeFormat: dateTimeFormat,
    cancelLabel: 'Cancel',
    container: 'dialog',
    locale: 'en-US',
    okLabel: 'OK',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };
  /**
   * @desc 调用onShow方法并设置state的open为true
   * @emits {onShow} 调用props的onShow方法 
   */
  show = () => {
    if (this.props.onShow && !this.state.open) {
      this.props.onShow();
    }

    this.setState({
      open: true,
    });
  };
  /**
   * @desc 调用props的onDismiss方法，并设置state的open为false
   * @emits {onDismiss} 
   */
  dismiss = () => {
    if (this.props.onDismiss && this.state.open) {
      this.props.onDismiss();
    }

    this.setState({
      open: false,
    });
  };
  /**
   * @desc 如果props上的autoOk为true，则异步调用handleTouchTapOk方法 
   */
  handleTouchTapDay = () => {
    if (this.props.autoOk) {
      setTimeout(this.handleTouchTapOk, 300);
    }
  };
  /**
   * @alias dismiss方法别名 
   */
  handleTouchTapCancel = () => {
    this.dismiss();
  };
  /**
   * @alias dismiss方法别名
   */
  handleRequestClose = () => {
    this.dismiss();
  };
  /**
   * @desc 调用props的onAccept方法，并设置state的open为false
   * @emits {onAccept}
   */
  handleTouchTapOk = () => {
    if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    this.setState({
      open: false,
    });
  };
  /**
   * @desc keyup的句柄,如果为enter键，则调用handleTouchTapOk方法
   * @param {Event} 
   */
  handleWindowKeyUp = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.handleTouchTapOk();
        break;
    }
  };

  /**
   *@return {JSXElement} 返回一个包含Dialog[container为dialog]或Popver[container为inline]与Calendar的jsx元素 
   */
  render() {
    const {
      DateTimeFormat,
      autoOk,
      cancelLabel,
      container,
      containerStyle,
      disableYearSelection,
      initialDate,
      firstDayOfWeek,
      locale,
      maxDate,
      minDate,
      mode,
      okLabel,
      onAccept, // eslint-disable-line no-unused-vars
      onDismiss, // eslint-disable-line no-unused-vars
      onShow, // eslint-disable-line no-unused-vars
      shouldDisableDate,
      style, // eslint-disable-line no-unused-vars
      wordings,
      animation,
      ...other,
    } = this.props;

    const {open} = this.state;

    const styles = {
      dialogContent: {
        width: mode === 'landscape' ? 479 : 310,
      },
      dialogBodyContent: {
        padding: 0,
        minHeight: mode === 'landscape' ? 330 : 434,
        minWidth: mode === 'landscape' ? 479 : 310,
      },
    };

    const Container = (container === 'inline' ? Popover : Dialog);

    return (
      <div {...other} ref="root">
        <Container
          anchorEl={this.refs.root} // For Popover
          animation={animation || PopoverAnimationVertical} // For Popover
          bodyStyle={styles.dialogBodyContent}
          contentStyle={styles.dialogContent}
          ref="dialog"
          repositionOnUpdate={true}
          open={open}
          onRequestClose={this.handleRequestClose}
          style={Object.assign(styles.dialogBodyContent, containerStyle)}
        >
          <EventListener
            target="window"
            onKeyUp={this.handleWindowKeyUp}
          />
          <Calendar
            autoOk={autoOk}
            DateTimeFormat={DateTimeFormat}
            cancelLabel={cancelLabel}
            disableYearSelection={disableYearSelection}
            firstDayOfWeek={firstDayOfWeek}
            initialDate={initialDate}
            locale={locale}
            onTouchTapDay={this.handleTouchTapDay}
            maxDate={maxDate}
            minDate={minDate}
            mode={mode}
            open={open}
            ref="calendar"
            onTouchTapCancel={this.handleTouchTapCancel}
            onTouchTapOk={this.handleTouchTapOk}
            okLabel={okLabel}
            shouldDisableDate={shouldDisableDate}
            wordings={wordings}
          />
        </Container>
      </div>
    );
  }
}

export default DatePickerDialog;
