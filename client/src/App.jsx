import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Allroute from "./routes/Allroute";
import './App.css'

// Initialize socket outside the component
const socket = io('http://localhost:8040', {
  autoConnect: false,
});


const App = () => {
  const [userName, setUserName] = useState('');
  const [currentUsers, setCurrentUsers] = useState([]);
  const [selfSocketId, setSelfSocketId] = useState();
  const navigate = useNavigate();

 useEffect(()=>{
  
  socket.on('new-users', (data) => {
    setCurrentUsers(data);
    navigate('/dashboard');
  });

  socket.on('notification-of-user-joining',(data)=>{
    console.log('a new user joined',data)
  })

  socket.on('connect', () => {
    console.log('Connected with ID:', socket.id);
    setSelfSocketId(socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });

 },[])

 useEffect(()=>{
  socket.io.opts.query = {userName};
 },[userName])

  return (
    <>
      <div style={{
        display: currentUsers.length > 0 ? 'none' : 'block',
        margin: "auto", width: "20%", marginTop: "20%"
      }}>
        <input
          type="text"
          placeholder="Enter your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{ height: "6vh", outline: "none", fontSize: "1rem" }}
        />
        <button
          style={{ backgroundColor: "red", color: "white", height: "7vh", border: "none", width: "7rem", fontSize: '1rem' }}
          onClick={() => socket.connect()}
          disabled={!userName}
        >
          Connect
        </button>
      </div>
      <Allroute users={currentUsers} selfSocketId={selfSocketId} />
    </>
  );
};

export default App;
