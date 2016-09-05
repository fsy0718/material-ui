import React, {Component, PropTypes} from 'react';
import IconButton from '../IconButton';
import NavigationChevronLeft from '../svg-icons/navigation/chevron-left';
import NavigationChevronRight from '../svg-icons/navigation/chevron-right';
import SlideInTransitionGroup from '../internal/SlideIn';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'inherit',
    height: 48,
  },
  titleDiv: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
  },
  titleText: {
    height: 'inherit',
    paddingTop: 12,
  },
};
/**
 * 
 * @desc requires {@link React~Component} | {@link IconButton} | internal {@link SlideIn}
 * @class CalendarToolbar
 * @extends {Component}
 */
class CalendarToolbar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    displayDate: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    nextMonth: PropTypes.bool,
    onMonthChange: PropTypes.func,
    prevMonth: PropTypes.bool,
  };

  static defaultProps = {
    nextMonth: true,
    prevMonth: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    transitionDirection: 'up',
  };
  /**
   * 通过比较props的displayDate与nextProps的displayDate的大小，确定transitionDirection的方向，设置state的transitionDirection的值
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.displayDate !== this.props.displayDate) {
      const direction = nextProps.displayDate > this.props.displayDate ? 'left' : 'right';
      this.setState({
        transitionDirection: direction,
      });
    }
  }
  /**
   * @desc 前一个月点击事件
   * @emits {onMonthChange}
   */
  handleTouchTapPrevMonth = () => {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  };
  /**
   * @desc 后一个月点击事件
   * @emits {onMonthChange} 
   */
  handleTouchTapNextMonth = () => {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  };
  /**
   * @returns {JSXElement}
   */
  render() {
    const {DateTimeFormat, locale, displayDate} = this.props;

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const nextButtonIcon = this.context.muiTheme.isRtl ? <NavigationChevronLeft /> : <NavigationChevronRight />;
    const prevButtonIcon = this.context.muiTheme.isRtl ? <NavigationChevronRight /> : <NavigationChevronLeft />;

    return (
      <div style={styles.root}>
        <IconButton
          disabled={!this.props.prevMonth}
          onTouchTap={this.handleTouchTapPrevMonth}
        >
          {prevButtonIcon}
        </IconButton>
        <SlideInTransitionGroup
          direction={this.state.transitionDirection}
          style={styles.titleDiv}
        >
          <div key={dateTimeFormatted} style={styles.titleText}>{dateTimeFormatted}</div>
        </SlideInTransitionGroup>
        <IconButton
          disabled={!this.props.nextMonth}
          onTouchTap={this.handleTouchTapNextMonth}
        >
          {nextButtonIcon}
        </IconButton>
      </div>
    );
  }
}

export default CalendarToolbar;
