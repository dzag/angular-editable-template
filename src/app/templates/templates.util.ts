export function fixLineBreak () {
  let sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      const el = document.createElement('div');
      el.innerHTML = '<br>';
      const frag = document.createDocumentFragment();
      let node, lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      const firstNode = frag.firstChild;
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if ((sel = document['selection']) && sel.type !== 'Control') {
    // IE < 9
    const originalRange = sel.createRange();
    originalRange.collapse(true);
    sel.createRange().pasteHTML('<br>');
  }
}

export function placeCaretAtEnd (element: HTMLElement) {
  element.focus();
  if (typeof window.getSelection !== 'undefined'
    && typeof document.createRange !== 'undefined') {
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body['createTextRange'] !== 'undefined') {
    const textRange = document.body['createTextRange']();
    textRange.moveToElementText(element);
    textRange.collapse(false);
    textRange.select();
  }
}
