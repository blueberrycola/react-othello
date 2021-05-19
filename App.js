/**
 * Othello UX using React
 * Author: Chase Johnston
 */
import logo from './logo.svg';
import './App.css';
import './Othello';

//TODO:
/* 
 * Create starting window (ask for size and color of piece B or W)
 * Create empty game window
 * Create win/lose/tie window
 * 
 * 
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
