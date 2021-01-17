export function drag(elem, moveX = 10, moveY = 10) {
  $(elem).trigger($.Event('mousedown', { pageX: 0, pageY: 0 }));
  $(elem).trigger($.Event('mousemove', { pageX: moveX, pageY: moveY }));
  $(elem).trigger($.Event('mouseup'));
}
