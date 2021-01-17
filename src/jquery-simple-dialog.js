import $ from 'jquery';

import { NAMESPACE } from './consts';
import SimpleDialog from './simple-dialog';

$.fn.simpleDialog = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if ($elem.data(NAMESPACE)) $elem.data(NAMESPACE).destroy();
    $elem.data(NAMESPACE, new SimpleDialog($elem, options));
  });
};

$.SimpleDialog = SimpleDialog;
