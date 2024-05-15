import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const socket = useMemo(() => io('http://localhost:3000'), []);

  const sendMessage = () => {
    socket.emit('message', text);
  }
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server', socket.id);
    });
    socket.on('me', (data) => {
      console.log('Me', data);
    });
    socket.on('new-user', (data) => {
      console.log('New user', data);
    });
    socket.on('message', (data) => {
      console.log('Message', data);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Socket.io</h1>
        <input type="text" placeholder="Enter any message" onChange={(e) => setText(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </header>
    </div>
  );
}

export default App;
