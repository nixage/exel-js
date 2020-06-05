class Dom {
  constructor(selector) {
    this.el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.listeners = [];
  }


  html(html) {
    if (typeof html === 'string') {
      this.el.innerHTML = html;
      return this;
    }
    return this.el.innerHTML;
  }
  text(text) {
    if (typeof text === 'string') {
      if (this.el.tagName.toLowerCase() === 'input') {
        this.el.value = text;
        return this
      }
      this.el.innerText = text;
      return this
    }
    if (this.el.tagName.toLowerCase() === 'input') {
      return this.el.value
    }
    return this.el.innerText
  }

  append(element) {
    if (element instanceof Dom) {
      element = element.el;
    }
    this.el.append(element);
    return this;
  }

  on(eventType, selector, callback) {
    const nodeElements = this.el.querySelectorAll(selector);
    if (nodeElements) {
      for (let i = 0; i < nodeElements.length; i++) {
        nodeElements[i].addEventListener(eventType, callback);
        this.listeners.push({
          nodeElement: nodeElements[i],
          fn: callback,
        });
      }
    }
  }

  off(eventType, selector, callback) {
    const listener = this.listeners.find((el) => el.fn === callback);
    if (listener) {
      listener.nodeElement.removeEventListener(eventType, callback);
    }
  }

  closest(selector) {
    return $(this.el.closest(selector));
  }

  cords() {
    return this.el.getBoundingClientRect();
  }

  all(selector) {
    return this.el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.el.querySelector(selector))
  }

  get data() {
    return this.el.dataset
  }

  get height() {
    return this.el.clientHeight
  }

  get width() {
    return this.el.clientWidth
  }

  css(style, value) {
    this.el.style[style] = value;
    return this
  }

  add(className) {
    this.el.classList.add(className)
    return this
  }
  remove(className) {
    this.el.classList.remove(className)
    return this
  }

  focus() {
    this.el.focus()
    return this
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = function(tagName, classes = '') {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};

$.all = function(selector) {
  return document.querySelectorAll(selector);
};