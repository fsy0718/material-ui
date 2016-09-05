/**
 * @alias utils.dom
 */
export default {
  /**
   * 判断parent是否包含child元素
   * @param  {HTMLDom}  parent
   * @param  {HTMLDom}  child
   * @return {Boolean}
   */
  isDescendant(parent, child) {
    let node = child.parentNode;

    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }

    return false;
  },

  offset(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  },

};
