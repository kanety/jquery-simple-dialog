import $ from 'jquery';
import { NAMESPACE } from './consts';

export default class Dialog {
  constructor(instance) {
    this.instance = instance;
    this.options = instance.options;
    this.$dialog = instance.$dialog;

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

    this.$parent = this.$dialog.parent();
    this.$opener = $(this.options.opener);
    this.$closer = $(this.options.closer);

    if (this.options.modal) {
      this.$modal = $('<div>').addClass(`${NAMESPACE}-modal`).hide();
      this.$modal.append(this.$dialog);
      this.$parent.append(this.$modal);
    }
  }

  init() {
    this.$dialog.addClass(`${NAMESPACE}`);
    this.unbind();
    this.bind();
  }

  destroy() {
    this.$dialog.removeClass(`${NAMESPACE}`);
    this.$dialog.removeData(NAMESPACE);
    if (this.options.modal) {
      this.$parent.append(this.$dialog);
      this.$modal.remove();
    }
    this.unbind();
  }

  bind() {
    this.$opener.on(`click.${this.namespace}`, (e) => {
      e.preventDefault();
      this.open($(e.currentTarget));
    });
    this.$closer.on(`click.${this.namespace}`, (e) => {
      e.preventDefault();
      this.close($(e.currentTarget));
    });

    $(document).on(`keydown.${this.namespace}`, (e) => {
      if (e.keyCode == 27) {
        e.preventDefault();
        this.close($(e.currentTarget));
      }
    });

    if (this.options.modal) {
      this.$modal.on(`click.${this.namespace}`, (e) => {
        if (e.target != this.$dialog.get(0) && !$.contains(this.$modal.get(0), e.target)) {
          this.close($(e.currentTarget));
        }
      });
    }
  }

  unbind() {
    this.$opener.off(`.${this.namespace}`);
    this.$closer.off(`.${this.namespace}`);
    this.$dialog.off(`.${this.namespace}`);
    $(document).off(`.${this.namespace}`);
  }

  open($target) {
    if (this.$dialog.is(':visible')) return;

    this.$dialog.show();

    if (this.options.modal) {
      this.$modal.show();
      $(document).find('body').addClass(`${NAMESPACE}-disable-scroll`);
    }
    if (this.options.focus) {
      this.$dialog.find(this.options.focus).focus();
    }

    this.$dialog.trigger('dialog:open', [$target]);
  }

  close($target) {
    if (this.$dialog.is(':hidden')) return;

    this.$dialog.hide();

    if (this.options.modal) {
      this.$modal.hide();
      $(document).find('body').removeClass(`${NAMESPACE}-disable-scroll`);
    }

    this.$dialog.trigger('dialog:close', [$target]);
  }
}
