import { drag } from './helper'

describe('jquery-simple-dialog', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic', () => {
    let $dialog;
    let $opener, $ok, $cancel;
 
    beforeEach(() => {
      $dialog = $('#basic');
      $opener = $('#basic_opener');
      $ok = $('#basic_ok');
      $cancel = $('#basic_cancel');
    });

    it('opens a dialog', () => {
      expect($dialog.is(':visible')).toEqual(false);
      $opener.click();
      expect($dialog.is(':visible')).toEqual(true);
    });

    it('closes a dialog by ok button', () => {
      $opener.click();
      $ok.click();
      expect($dialog.is(':visible')).toEqual(false);
    });

    it('closes a dialog by close button', () => {
      $opener.click();
      $cancel.click();
      expect($dialog.is(':visible')).toEqual(false);
    });

    it('closes a dialog by ESC key', () => {
      $opener.click();
      $(document).trigger($.Event('keydown', { keyCode: 27 }));
      expect($dialog.is(':visible')).toEqual(false);
    });

    it('focuses an element', () => {
      $opener.click();
      expect(document.activeElement.id).toEqual('basic_ok');
    });
  });

  describe('drag', () => {
    let $dialog;
    let $opener, $dragger;

    beforeEach(() => {
      $dialog = $('#drag');
      $opener = $('#drag_opener');
      $dragger = $('#drag_title');
    });

    it('moves dialog by drag', () => {
      $opener.click();
      let [top, left] = [$dialog.offset().top, $dialog.offset().left];
      drag($dragger, 5, 5);
      expect($dialog.offset().top).not.toEqual(top);
      expect($dialog.offset().left).not.toEqual(left);
    });
  });

  describe('modal', () => {
    let $dialog;
    let $opener;
 
    beforeEach(() => {
      $dialog = $('#modal');
      $opener = $('#modal_opener');
    });

    it('opens a modal dialog', () => {
      expect($dialog.is(':visible')).toEqual(false);
      $opener.click();
      expect($dialog.is(':visible')).toEqual(true);
    });

    it('closes a modal dialog', () => {
      $opener.click();
      $dialog.parent().click();
      expect($dialog.is(':visible')).toEqual(false);
    });
  });

  describe('callbacks', () => {
    let $dialog;
    let $opener, $ok;
 
    beforeEach(() => {
      $dialog = $('#callback');
      $opener = $('#callback_opener');
      $ok = $('#callback_ok');

      spyOn(console, 'log');
    });

    it('runs open callbacks', () => {
      $opener.click();
      expect(console.log).toHaveBeenCalledWith('opened by callback_opener');
      $ok.click();
      expect(console.log).toHaveBeenCalledWith('closed by callback_ok');
    });
  });

  describe('destroy', () => {
    let $dialog;
 
    beforeEach(() => {
      eval($('script').text());
      $dialog = $('#basic');
      $dialog.data('simple-dialog').destroy();
    });

    it('destroys existing object', () => {
      expect($dialog.data('simple-dialog')).toEqual(undefined);
    });
  });
});
