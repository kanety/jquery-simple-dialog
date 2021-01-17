import $ from 'jquery';
import { NAMESPACE } from './consts';

export default class Dragger {
  constructor(instance) {
    this.instance = instance;
    this.options = instance.options;
    this.$dialog = instance.$dialog;

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

    this.$dragger = this.$dialog.find(this.options.dragger);
  }

  init() {
    this.dragging = false;
    this.startPos = [0, 0];
    this.targetPos = [0, 0];

    this.unbind();
    this.bind();
  }

  destroy() {
    this.unbind();
  }

  bind() {
    if (!this.$dragger.length) return;

    this.$dragger.on(`mousedown.${this.namespace}`, (e) => {
      this.dragStart([e.pageX, e.pageY]);
    }).on(`touchstart.${this.namespace}`, (e) => {
      let t = e.originalEvent.changedTouches[0];
      this.dragStart([t.pageX, t.pageY]);
    });

    $(document).on(`mousemove.${this.namespace}`, (e) => {
      this.drag([e.pageX, e.pageY]);
    }).on(`mouseup.${this.namespace} mouseleave.${this.namespace}`, (e) => {
      this.dragEnd([e.pageX, e.pageY]);
    }).on(`touchmove.${this.namespace}`, (e) => {
      this.drag([e.changedTouches[0].pageX, e.changedTouches[0].pageY]);
    }).on(`touchend.${this.namespace}`, (e) => {
      this.dragEnd([e.pageX, e.pageY]);
    });
  }

  unbind() {
    $(document).off(`.${this.namespace}`);
  }

  dragStart(pos) {
    this.dragging = true;
    this.startPos = pos;
    this.targetPos = this.parseTransform(this.$dialog.css('transform'));
    this.$dragger.addClass(`${NAMESPACE}-user-select-none`);
  }

  drag(pos) {
    if (!this.dragging) return;

    let d = [pos[0] - this.startPos[0], pos[1] - this.startPos[1]];
    let t = [this.targetPos[0] + d[0], this.targetPos[1] + d[1]];

    this.$dialog.css('transform', `translate(${t[0]}px, ${t[1]}px)`);
  }

  dragEnd() {
    this.dragging = false;
    this.$dragger.removeClass(`${NAMESPACE}-user-select-none`);
  }

  parseTransform(string) {
    let matched = string.match(/matrix\((.+)\)/)
    if (matched) {
      let values = matched[1].split(',');
      return [parseInt(values[4]), parseInt(values[5])];
    } else {
      return [0, 0]
    }
  }
}
