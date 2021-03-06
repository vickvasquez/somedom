import {
  createView as view,
  mountElement as mount,
  updateElement as patch,
  createElement as render,
  destroyElement as unmount,
} from './lib/node';

import {
  invokeProps,
  applyStyles as styles,
  applyClasses as classes,
  applyAnimations as animation,
} from './lib/props';

import {
  apply, format, filter, isFunction,
} from './lib/util';

import { addEvents } from './lib/events';

export const h = (name, attrs, ...children) => [name, attrs, children];

export const pre = (vnode, svg, cb = render) => {
  return cb(['pre', { class: 'highlight' }, format(cb(vnode, svg).outerHTML)], svg);
};

export const bind = (tag, ...hooks) => {
  const cbs = filter(hooks, isFunction);

  const mix = (...args) => {
    return cbs.reduce((prev, cb) => cb(...args) || prev, undefined);
  };

  return (...args) => (args.length <= 2 ? tag(args[0], args[1], mix) : mix(...args));
};

export const listeners = opts => apply(addEvents, 3, opts);
export const attributes = opts => apply(invokeProps, 3, opts);

export {
  createView as view,
  mountElement as mount,
  updateElement as patch,
  createElement as render,
  destroyElement as unmount,
} from './lib/node';

export {
  applyStyles as styles,
  applyClasses as classes,
  applyAnimations as animation,
} from './lib/props';

export default {
  h,
  pre,
  bind,

  view,
  mount,
  patch,
  render,
  unmount,

  listeners,
  attributes,

  styles,
  classes,
  animation,
};
