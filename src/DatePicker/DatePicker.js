import React, {Component, PropTypes} from 'react';
import {dateTimeFormat, formatIso, isEqualDate} from './dateUtils';
import DatePickerDialog from './DatePickerDialog';
import TextField from '../TextField';
import deprecated from '../utils/deprecatedPropType';
/**
 * @desc 日期选择器组件,依赖于{@see https://facebook.github.io/react/docs/component-api.html} | dateUtils {@link dateTimeFormat}、{@link formatIso}、{@link isEqualDate} | 
 * {@link TextField} | {@link DatePickerDialog} | utils {@link deprecated}
 * @class DatePicker
 * @extends {React~Component}
 */
class DatePicker extends Component {
  static propTypes = {
    /**
     * Constructor for date formatting for the specified `locale`.
     * The constructor must follow this specification: ECMAScript Internationalization API 1.0 (ECMA-402).
     * `Intl.DateTimeFormat` is supported by most modern browsers, see http://caniuse.com/#search=intl,
     * otherwise https://github.com/andyearnshaw/Intl.js is a good polyfill.
     *
     * By default, a built-in `DateTimeFormat` is used which supports the 'en-US' `locale`.
     */
    DateTimeFormat: PropTypes.func,
    /**
     * If true, automatically accept and close the picker on select a date.
     */
    autoOk: PropTypes.bool,
    /**
     * Override the default text of the 'Cancel' button.
     */
    cancelLabel: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Used to control how the Date Picker will be displayed when the input field is focused.
     * `dialog` (default) displays the DatePicker as a dialog with a modal.
     * `inline` displays the DatePicker below the input field (similar to auto complete).
     */
    container: PropTypes.oneOf(['dialog', 'inline']),
    /**
     * This is the initial date value of the component.
     * If either `value` or `valueLink` is provided they will override this
     * prop with `value` taking precedence.
     */
    defaultDate: PropTypes.object,
    /**
     * Override the inline-styles of DatePickerDialog's Container element.
     */
    dialogContainerStyle: PropTypes.object,
    /**
     * Disables the year selection in the date picker.
     */
    disableYearSelection: PropTypes.bool,
    /**
     * Disables the DatePicker.
     */
    disabled: PropTypes.bool,
    /**
     * Used to change the first day of week. It varies from
     * Saturday to Monday between different locales.
     * The allowed range is 0 (Sunday) to 6 (Saturday).
     * The default is `1`, Monday, as per ISO 8601.
     */
    firstDayOfWeek: PropTypes.number,
    /**
     * This function is called to format the date displayed in the input field, and should return a string.
     * By default if no `locale` and `DateTimeFormat` is provided date objects are formatted to ISO 8601 YYYY-MM-DD.
     *
     * @param {object} date Date object to be formatted.
     * @returns {any} The formatted date.
     */
    formatDate: PropTypes.func,
    /**
     * Locale used for formatting the `DatePicker` date strings. Other than for 'en-US', you
     * must provide a `DateTimeFormat` that supports the chosen `locale`.
     */
    locale: PropTypes.string,
    /**
     * The ending of a range of valid dates. The range includes the endDate.
     * The default value is current date + 100 years.
     */
    maxDate: PropTypes.object,
    /**
     * The beginning of a range of valid dates. The range includes the startDate.
     * The default value is current date - 100 years.
     */
    minDate: PropTypes.object,
    /**
     * Tells the component to display the picker in portrait or landscape mode.
     */
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    /**
     * Override the default text of the 'OK' button.
     */
    okLabel: PropTypes.node,
    /**
     * Callback function that is fired when the date value changes.
     *
     * @param {null} null Since there is no particular event associated with the change,
     * the first argument will always be null.
     * @param {object} date The new date.
     */
    onChange: PropTypes.func,
    /**
     * Callback function that is fired when the Date Picker's dialog is dismissed.
     */
    onDismiss: PropTypes.func,
    /**
     * Callback function that is fired when the Date Picker's `TextField` gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Callback function that is fired when the Date Picker's dialog is shown.
     */
    onShow: PropTypes.func,
    /**
     * Callback function that is fired when a touch tap event occurs on the Date Picker's `TextField`.
     *
     * @param {object} event TouchTap event targeting the `TextField`.
     */
    onTouchTap: PropTypes.func,
    /**
     * Callback function used to determine if a day's entry should be disabled on the calendar.
     *
     * @param {object} day Date object of a day.
     * @returns {boolean} Indicates whether the day should be disabled.
     */
    shouldDisableDate: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of DatePicker's TextField element.
     */
    textFieldStyle: PropTypes.object,
    /**
     * Sets the date for the Date Picker programmatically.
     */
    value: PropTypes.object,
    /**
     * Wordings used inside the button of the dialog.
     */
    wordings: deprecated(PropTypes.object, `Instead, use \`cancelLabel\` and \`okLabel\`.
      It will be removed with v0.16.0.`),
  };
  /**
   * defaultProps
   * @property {Object} defaultProps 默认属性
   * @property {boolean} defaultProps.autoOk 选择日期后是否自动关闭日期选择器
   */
  static defaultProps = {
    autoOk: false,
    container: 'dialog',
    disabled: false,
    disableYearSelection: false,
    firstDayOfWeek: 1,
    style: {},
  };
  /**
   * 
   * @property {Object} contextTypes 作用域类型
   * @static
   */
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  /**
   * @type {Object} state 初始化state值，如果未定义，则导致初始化组件时this.state为null
   * @type {undefined} state.date 初始化日期值 
   */
  state = {
    date: undefined,
  };
  /**
   * @desc 组件装载前设置state的date值
   */
  componentWillMount() {
    this.setState({
      date: this.isControlled() ? this.getControlledDate() : this.props.defaultDate,
    });
  }
  /**
   * 在接收新props时，截取date，判断state的date与props的date是否一样，如果不一样，就更新state的date
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.isControlled()) {
      const newDate = this.getControlledDate(nextProps);
      if (!isEqualDate(this.state.date, newDate)) {
        this.setState({
          date: newDate,
        });
      }
    }
  }
  /**
   * 返回当前选择的日期
   * @returns {Date}
   */
  getDate() {
    return this.state.date;
  }

  /**
   * Open the date-picker dialog programmatically from a parent.
   */
  openDialog() {
    /**
     * if the date is not selected then set it to new date
     * (get the current system date while doing so)
     * else set it to the currently selected date
     */
    if (this.state.date !== undefined) {
      this.setState({
        dialogDate: this.getDate(),
      }, this.refs.dialogWindow.show);
    } else {
      this.setState({
        dialogDate: new Date(),
      }, this.refs.dialogWindow.show);
    }
  }

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  }

  /**
   *  接收日期的一个中间函数,如果当前props中无value字段，则设置state的date值，调用props中的onChange函数
   * @emits {onChange} 调用props中的onChange
   * @param {Date} date 日期
   */
  handleAccept = (date) => {
    if (!this.isControlled()) {
      this.setState({
        date: date,
      });
    }
    if (this.props.onChange) {
      this.props.onChange(null, date);
    }
  };
  /**
   * forcs句柄
   * @param {Event} event 
   */
  handleFocus = (event) => {
    event.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  /**
   * touchtap句柄,异步调用openDialog函数
   * @emits {onTouchTap} 调用props中的onTouchTap事件
   * @param {Event} event
   * 
   */
  handleTouchTap = (event) => {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(event);
    }

    if (!this.props.disabled) {
      setTimeout(() => {
        this.openDialog();
      }, 0);
    }
  };
  /**
   * 当前props中是否有value字段 
   * @returns
   */
  isControlled() {
    return this.props.hasOwnProperty('value');
  }
  /**
   * 获取props中的日期值
   * @param {Object} [props=this.props]
   * @returns {Date}
   */
  getControlledDate(props = this.props) {
    if (props.value instanceof Date) {
      return props.value;
    }
  }
  /**
   * 调用props的DateTime格式化date对象
   * @param {Date}
   * @returns {String}
   */
  formatDate = (date) => {
    if (this.props.locale) {
      const DateTimeFormat = this.props.DateTimeFormat || dateTimeFormat;
      return new DateTimeFormat(this.props.locale, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }).format(date);
    } else {
      return formatIso(date);
    }
  };
  /**
   * 渲染组件，包含TextField与DatePickerDialog
   * @return {JSXElement}
   */
  render() {
    const {
      DateTimeFormat,
      autoOk,
      cancelLabel,
      className,
      container,
      defaultDate, // eslint-disable-line no-unused-vars
      dialogContainerStyle,
      disableYearSelection,
      firstDayOfWeek,
      formatDate: formatDateProp,
      locale,
      maxDate,
      minDate,
      mode,
      okLabel,
      onDismiss,
      onFocus, // eslint-disable-line no-unused-vars
      onShow,
      onTouchTap, // eslint-disable-line no-unused-vars
      shouldDisableDate,
      style,
      textFieldStyle,
      wordings,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const formatDate = formatDateProp || this.formatDate;

    return (
      <div className={className} style={prepareStyles(Object.assign({}, style))}>
        <TextField
          {...other}
          onFocus={this.handleFocus}
          onTouchTap={this.handleTouchTap}
          ref="input"
          style={textFieldStyle}
          value={this.state.date ? formatDate(this.state.date) : ''}
        />
        <DatePickerDialog
          DateTimeFormat={DateTimeFormat}
          autoOk={autoOk}
          cancelLabel={cancelLabel}
          container={container}
          containerStyle={dialogContainerStyle}
          disableYearSelection={disableYearSelection}
          firstDayOfWeek={firstDayOfWeek}
          initialDate={this.state.dialogDate}
          locale={locale}
          maxDate={maxDate}
          minDate={minDate}
          mode={mode}
          okLabel={okLabel}
          onAccept={this.handleAccept}
          onShow={onShow}
          onDismiss={onDismiss}
          ref="dialogWindow"
          shouldDisableDate={shouldDisableDate}
          wordings={wordings}
        />
      </div>
    );
  }
}

export default DatePicker;
