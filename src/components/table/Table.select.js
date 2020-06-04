import {$} from '@core/dom';
import {parseId} from './table.function';
import {createRange} from './table.function';

export class TableSelect {
  static className = 'selected';

  constructor() {
    this.arrayOfSelectedElements = [];
    this.currentElement = '';
  }

  select(element) {
    this.removeSelectedElements()
    element.add(TableSelect.className);
    this.arrayOfSelectedElements.push(element)
    this.currentElement = element;
  }

  removeSelectedElements() {
    this.arrayOfSelectedElements.forEach(el => el.remove(TableSelect.className));
    this.arrayOfSelectedElements = []
  }

  selectGroup(element) {
    this.removeSelectedElements();
    // currentId === this.currentElement
    const currentId = parseId(this.currentElement.data.id)
    // targetId === event.target
    const targetId = parseId(element.data.id)
    const uniqId = createRange(currentId, targetId);
    uniqId.forEach( el => {
      const element = $(`[data-id="${el}"]`);
      element.add('selected')
      this.arrayOfSelectedElements.push(element)
    })
  }
}

