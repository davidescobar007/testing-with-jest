import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Todo, TodoForm, useTodos } from './App';


//to configure enzyme ***its really important doing this
configure({ adapter: new Adapter() });

describe("App", () => {
  describe("Todo", () => {
    it('run completeTodo when Complete is clicked', () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        texto: 'lala'
      }
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />);
      wrapper.find('button').at(0).simulate('click');
      expect(completeTodo.mock.calls).toEqual([[5]])
      expect(removeTodo.mock.calls).toEqual([])
    });

    it('run removeTodo when remove is clicked', () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        texto: 'lala'
      }
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />);
      wrapper.find('button').at(1).simulate('click');
      expect(removeTodo.mock.calls).toEqual([[5]])
      expect(completeTodo.mock.calls).toEqual([])
    });
  })

  describe("TodoForm", () => {
    it('calling addTodo when form has a value', () => {
      const addTodo = jest.fn();
      const wrapper = shallow(
        <TodoForm
          addTodo={addTodo}
        />
      );
      wrapper.find('input').simulate('change', { target: { value: 'mi nuevo todo' } });
      wrapper.find('form').simulate('submit', { preventDefault: () => { } })
      expect(addTodo.mock.calls).toEqual([['mi nuevo todo']])
    });
  });

  describe("custom hook: useTodos", () => {
    it('addTodo', () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div{...hook}></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />)
      let props = wrapper.find('div').props();
      props.addTodo('some test text');
      props = wrapper.find('div').props();
      expect(props.todos[0]).toEqual({ text: 'some test text' });
    });

    it('completeTodo', () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div{...hook}></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />)
      let props = wrapper.find('div').props();
      props.completeTodo(0);
      props = wrapper.find('div').props();
      expect(props.todos[0]).toEqual({ text: "Todo 1", isCompleted: true });
    });

    it('removeTodo', () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div{...hook}></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />)
      let props = wrapper.find('div').props();
      props.removeTodo(0);
      props = wrapper.find('div').props();
      expect(props.todos).toEqual([
        {
          text: "Todo 2",
          isCompleted: false
        },
        {
          text: "Todo 3",
          isCompleted: false
        }
      ]);
      console.log(props.todos)
    });
  });

});
