import $ from 'jquery';
import './simple-dialog.scss';

import Dialog from './dialog';
import Dragger from './dragger';

const DEFAULTS = {
  opener: null,
  closer: null,
  dragger: null,
  focus: null,
  modal: false
};

export default class SimpleDialog {
  constructor(dialog, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);
    this.$dialog = $(dialog);

    this.dialog = new Dialog(this);
    this.dragger = new Dragger(this);

    this.init();
  }

  init() {
    this.dialog.init();
    this.dragger.init();
  }

  destroy() {
    this.dialog.destroy();
    this.dragger.destroy();
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(true, DEFAULTS, options);
  }
}
