class Detabinator {
  constructor(element) {
    if (!element) {
      throw new Error('Missing required argument. New Detabinator neets an element reference');
    }
      this._inert = false;
      this._focusableElementString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, embed, [tabindex], [contenteditable]';
      this._focusableElements = Array.from(
      element.querySelectorAll(this._focusableElementString)
    );
  }

  get inert() {
    return this._inert;
  }

  set inert(isInert) {
    if(this._inert === isInert) {
      return;
    }

    this._inert = isInert;

    this._focusableElements.forEach((child) => {
      if(isInert) {
        //if the child has an explicit tabindex save it.
        if(child.hasAttribute('tabindex')) {
          child._savedTabindex = child.tabIndex;
        }
        //set all focusable children to tabindex -1
        child.setAttribute('tabindex', -1);
      } else {
        //if the child has a saved tabindex, restore it.
        //because the value could be 0, explicitly check that it's not false.
        if(child._savedTabindex === 0 || child._savedTabindex) {
          return child.setAttribute('tabindex', child._savedTabindex);
        } else {
          //remove tabindex from any remaining children.
          child.removeAttribute('tabindex');
        }
      }
    });
  }
}
