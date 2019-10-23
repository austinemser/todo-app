import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('TodoList', () => {
  let component;
  let todos = [
    { title: 'Item 1', done: false },
    { title: 'Item 2', done: false },
    { title: 'Item 3', done: true }
  ];
  
  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../.././src/resources/elements/todo-list'))
      .inView('<todo-list todos.bind="todos"></todo-list>')
      .boundTo({ todos: todos });
  });

  it('should render the todos', done => {
    component.create(bootstrap).then(() => {
      const listElements = document.querySelectorAll('.item-text');
      expect(listElements[0].innerHTML).toContain('Item 1');
      done();
    }).catch(e => {
      console.log(e.toString());
    })
  })

  it('should should check checkboxes for completed todos', done => {
    component.create(bootstrap).then(() => {
      const checkboxes = document.querySelectorAll('input');
      expect(checkboxes[2].checked).toBe(true);
      done();
    }).catch(e => {
      console.log(e.toString());
    })
  })

  it('should should put a line through text for completed todos', done => {
    component.create(bootstrap).then(() => {
      const listElements = document.querySelectorAll('.item-text');
      var htmlElement = listElements[2] as HTMLElement;
      expect(htmlElement.style.textDecoration).toBe('line-through');
      done();
    }).catch(e => {
      console.log(e.toString());
    })
  })

  afterEach(() => {
    component.dispose();
  })

})
