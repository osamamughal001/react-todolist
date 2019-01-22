import React, { Component } from 'react';
import './App.css';
import TodoList from '../TodoList/TodoList';

class App extends Component {
  render() {
    return (
      <div className="App">
          <TodoList />
      </div>
    );
  }
}

export default App;
