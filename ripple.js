(document.head || document.querySelector('head')).insertAdjacentHTML(
    'afterbegin',
    `
  <style>
    [is="ripple-anchor"], [is="ripple-span"], [is="ripple-div"], [is="ripple-label"], ripple-element{
      overflow: hidden;
      outline: none;
    }

    ripple-element{
        display: inline-block;
    }

    button[is="ripple-button"]{
      appearance: button;
      -moz-appearance: button;
      -webkit-appearance: button;
      overflow: hidden;
      cursor: pointer;
      outline: none;
      border: none;
    }

    span.ripple {
      position: absolute;
      border-radius: 50%;
      opacity: 0.8;
      transform: scale(0);
      animation: ripple-element 600ms linear;
      z-index: 0;
      user-select: none;
      transition: 0.3s;
      pointer-events: none;
    }

    ripple-content, .ripple-content{
      position: relative;
      z-index: 1;
      display: block;
    }

    @keyframes ripple-element {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  </style>
`
);

class RippleMethods {
    rippleConstructor(rippleElement) {
        for (this.elementsToRipple of rippleElement) {
            this.elementsToRipple.addEventListener('click', (e) => {
                this.elementsToRipple.showRipple(e);
            });
        }
        if (rippleElement[0]?.dataset?.rippleTarget) {
            this.targetRipple = document.querySelectorAll(rippleElement[0].dataset.rippleTarget).length > 0 ? document.querySelectorAll(rippleElement[0].dataset.rippleTarget) : [rippleElement[0]];
            return this.targetRipple;
        }
        return rippleElement;
    }

    attributeChangedCallback(rippleElement, oldValue, newValue) {
        if (rippleElement[0]?.dataset?.rippleTarget) {
            this.targetRipple = document.querySelectorAll(rippleElement[0].dataset.rippleTarget).length > 0 ? document.querySelectorAll(rippleElement[0].dataset.rippleTarget) : [rippleElement[0]];
            this.onElementConnect(this.targetRipple);
            return this.targetRipple;
        }

        this.onElementConnect(rippleElement);
        return rippleElement;
    }

    allowedUnits() {
        return ['vw', 'vh', 'vmin', 'vmax', '%', 'px', 'em', 'rem'];
    }

    onElementConnect(rippleElement) {
        for (this.elementsToRipple of rippleElement) {
            if (window.getComputedStyle(this.elementsToRipple, null).getPropertyValue('position') === 'static' || !window.getComputedStyle(this.elementsToRipple, null).getPropertyValue('position')) {
                this.elementsToRipple.style.position = 'relative';
            }

            if (window.getComputedStyle(this.elementsToRipple, null).getPropertyValue('display') === 'inline' || !window.getComputedStyle(this.elementsToRipple, null).getPropertyValue('display')) {
                this.elementsToRipple.style.display = 'inline-block';
                this.elementsToRipple.style.verticalAlign = 'bottom';
            }
        }
    }

    showRipple(e = '', rippleElement, originalElement) {
        for (this.elementsToRipple of rippleElement) {
            this.targetRipple = this.elementsToRipple;
            const _rippleEl = document.createElement('span');
            this.rippleDiameter = this.elementsToRipple.dataset.rippleSize ? this.elementsToRipple.dataset.rippleSize : originalElement.dataset.rippleSize || Math.max(this.targetRipple.offsetWidth, this.targetRipple.offsetHeight);
            this.rippleRadius = this.rippleDiameter / 2;
            this.rippleElBounds = this.targetRipple.getBoundingClientRect();
            _rippleEl.style.width = _rippleEl.style.height = `${this.rippleDiameter}px`;
            _rippleEl.style.backgroundColor = this.elementsToRipple.dataset.rippleColor ? this.elementsToRipple.dataset.rippleColor : originalElement.dataset.rippleColor || '#fff';
            _rippleEl.style.opacity = this.elementsToRipple.dataset.rippleOpacity ? this.elementsToRipple.dataset.rippleOpacity : originalElement.dataset.rippleOpacity || '0.7';
            _rippleEl.style.animationDuration = this.elementsToRipple.dataset.rippleDuration ? this.elementsToRipple.dataset.rippleDuration : originalElement.dataset.rippleDuration || '0.5s';

            if (this.targetRipple.dataset.ripplePosition === 'center') {
                _rippleEl.style.left = `${this.rippleElBounds.width / 2 - this.rippleRadius}px`;
                _rippleEl.style.top = `${this.rippleElBounds.height / 2 - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'top') {
                _rippleEl.style.left = `${this.rippleElBounds.width / 2 - this.rippleRadius}px`;
                _rippleEl.style.top = `${0 - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'bottom') {
                _rippleEl.style.left = `${this.rippleElBounds.width / 2 - this.rippleRadius}px`;
                _rippleEl.style.top = `${this.rippleElBounds.height - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'left') {
                _rippleEl.style.left = `${0 - this.rippleRadius}px`;
                _rippleEl.style.top = `${this.rippleElBounds.height / 2 - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'right') {
                _rippleEl.style.left = `${this.rippleElBounds.width - this.rippleRadius}px`;
                _rippleEl.style.top = `${this.rippleElBounds.height / 2 - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'top-left') {
                _rippleEl.style.left = `${0 - this.rippleRadius}px`;
                _rippleEl.style.top = `${0 - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'top-right') {
                _rippleEl.style.left = `${this.rippleElBounds.width - this.rippleRadius}px`;
                _rippleEl.style.top = `${0 - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'center-left') {
                _rippleEl.style.left = `${0 - this.rippleRadius}px`;
                _rippleEl.style.top = `${this.rippleElBounds.height / 2 - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'center-right') {
                _rippleEl.style.left = `${this.rippleElBounds.width - this.rippleRadius}px`;
                _rippleEl.style.top = `${this.rippleElBounds.height / 2 - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'bottom-left') {
                _rippleEl.style.left = `${0 - this.rippleRadius}px`;
                _rippleEl.style.top = `${this.rippleElBounds.height - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition === 'bottom-right') {
                _rippleEl.style.left = `${this.rippleElBounds.width - this.rippleRadius}px`;
                _rippleEl.style.top = `${this.rippleElBounds.height - this.rippleRadius}px`;
            } else if (this.targetRipple.dataset.ripplePosition) {
                this.ripplePosition = this.targetRipple.dataset.ripplePosition.split(' ');
                if (this.ripplePosition.length > 0) {
                    if (this.ripplePosition[0] && this.ripplePosition[1]) {
                        _rippleEl.style.left = `calc(${this.ripplePosition[0]} - ${this.rippleRadius}px)`;
                        _rippleEl.style.top = `calc(${this.ripplePosition[1]} - ${this.rippleRadius}px)`;
                    } else if (this.ripplePosition[0]) {
                        _rippleEl.style.left = `calc(${this.ripplePosition[0]} - ${this.rippleRadius}px)`;
                        _rippleEl.style.top = `calc(${this.ripplePosition[0]} - ${this.rippleRadius}px)`;
                    }
                }
            } else if (!this.targetRipple.dataset.ripplePosition) {
                if (e?.isTrusted) {
                    if (e?.offsetX || e?.offsetHeight || e?.pageX || e?.pageY || e?.clientX || e?.clientY || e?.screenX || e?.screenY) {
                        this.rippleElBounds = originalElement.getBoundingClientRect();
                        _rippleEl.style.left = `calc(${((e.clientX - this.rippleElBounds.left) / this.rippleElBounds.width) * 100}% - ${this.rippleRadius}px)`;
                        _rippleEl.style.top = `calc(${((e.clientY - this.rippleElBounds.top) / this.rippleElBounds.height) * 100}% - ${this.rippleRadius}px)`;
                    } else {
                        _rippleEl.style.left = `${this.rippleElBounds.width / 2 - this.rippleRadius}px`;
                        _rippleEl.style.top = `${this.rippleElBounds.height / 2 - this.rippleRadius}px`;
                    }
                } else {
                    _rippleEl.style.left = `${this.rippleElBounds.width / 2 - this.rippleRadius}px`;
                    _rippleEl.style.top = `${this.rippleElBounds.height / 2 - this.rippleRadius}px`;
                }
            }

            _rippleEl.classList.add('ripple');
            _rippleEl.addEventListener('animationend', () => {
                _rippleEl.remove();
            });

            this.targetRipple.appendChild(_rippleEl);
        }
    }
}

class RippleElement extends HTMLElement {
    constructor() {
        super();
        this.targetRipple = [this];
        this.targetRipple = new RippleMethods().rippleConstructor([this]);
    }

    showRipple(e = '') {
        new RippleMethods().showRipple(e, this.targetRipple, this);
    }

    connectedCallback() {
        new RippleMethods().onElementConnect(this.targetRipple);
    }

    static get observedAttributes() {
        return ['data-ripple-target'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-ripple-target') {
            this.targetRipple = new RippleMethods().attributeChangedCallback([this], oldValue, newValue);
        }
    }
}
customElements.define('ripple-element', RippleElement);

class RippleButton extends HTMLButtonElement {
    constructor() {
        super();
        this.targetRipple = [this];
        this.targetRipple = new RippleMethods().rippleConstructor([this]);
    }

    showRipple(e = '') {
        new RippleMethods().showRipple(e, this.targetRipple, this);
    }

    connectedCallback() {
        new RippleMethods().onElementConnect(this.targetRipple);
    }

    static get observedAttributes() {
        return ['data-ripple-target'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-ripple-target') {
            this.targetRipple = new RippleMethods().attributeChangedCallback([this], oldValue, newValue);
        }
    }
}
customElements.define('ripple-button', RippleButton, {
    extends: 'button',
});

class RippleAnchor extends HTMLAnchorElement {
    constructor() {
        super();
        this.targetRipple = [this];
        this.targetRipple = new RippleMethods().rippleConstructor([this]);
    }

    showRipple(e = '') {
        new RippleMethods().showRipple(e, this.targetRipple, this);
    }

    connectedCallback() {
        new RippleMethods().onElementConnect(this.targetRipple);
    }

    static get observedAttributes() {
        return ['data-ripple-target'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-ripple-target') {
            this.targetRipple = new RippleMethods().attributeChangedCallback([this], oldValue, newValue);
        }
    }
}
customElements.define('ripple-anchor', RippleAnchor, {
    extends: 'a',
});

class RippleSpan extends HTMLSpanElement {
    constructor() {
        super();
        this.targetRipple = [this];
        this.targetRipple = new RippleMethods().rippleConstructor([this]);
    }

    showRipple(e = '') {
        new RippleMethods().showRipple(e, this.targetRipple, this);
    }

    connectedCallback() {
        new RippleMethods().onElementConnect(this.targetRipple);
    }

    static get observedAttributes() {
        return ['data-ripple-target'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-ripple-target') {
            this.targetRipple = new RippleMethods().attributeChangedCallback([this], oldValue, newValue);
        }
    }
}
customElements.define('ripple-span', RippleSpan, {
    extends: 'span',
});

class RippleDiv extends HTMLDivElement {
    constructor() {
        super();
        this.targetRipple = [this];
        this.targetRipple = new RippleMethods().rippleConstructor([this]);
    }

    showRipple(e = '') {
        new RippleMethods().showRipple(e, this.targetRipple, this);
    }

    connectedCallback() {
        new RippleMethods().onElementConnect(this.targetRipple);
    }

    static get observedAttributes() {
        return ['data-ripple-target'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-ripple-target') {
            this.targetRipple = new RippleMethods().attributeChangedCallback([this], oldValue, newValue);
        }
    }
}
customElements.define('ripple-div', RippleDiv, {
    extends: 'div',
});

class RippleLabel extends HTMLLabelElement {
    constructor() {
        super();
        this.targetRipple = [this];
        this.targetRipple = new RippleMethods().rippleConstructor([this]);
    }

    showRipple(e = '') {
        new RippleMethods().showRipple(e, this.targetRipple, this);
    }

    connectedCallback() {
        new RippleMethods().onElementConnect(this.targetRipple);
    }

    static get observedAttributes() {
        return ['data-ripple-target'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-ripple-target') {
            this.targetRipple = new RippleMethods().attributeChangedCallback([this], oldValue, newValue);
        }
    }
}
customElements.define('ripple-label', RippleLabel, {
    extends: 'label',
});

class RippleBody extends HTMLBodyElement {
    constructor() {
        super();
        this.targetRipple = [this];
        this.targetRipple = new RippleMethods().rippleConstructor([this]);
    }

    showRipple(e = '') {
        new RippleMethods().showRipple(e, this.targetRipple, this);
    }

    connectedCallback() {
        new RippleMethods().onElementConnect(this.targetRipple);
    }

    static get observedAttributes() {
        return ['data-ripple-target'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-ripple-target') {
            this.targetRipple = new RippleMethods().attributeChangedCallback([this], oldValue, newValue);
        }
    }
}
customElements.define('ripple-body', RippleBody, {
    extends: 'body',
});
