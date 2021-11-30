import {Component} from 'react'
import './App.css';
import Board from './Board';

class App extends Component{
  render() {
    return (
      <div className='App'>
        <h1>From App</h1>
        <Board />
      </div>
    )
  }
}

export default App;
