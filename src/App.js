import React, { useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { FaPlus, FaMinus, FaSun, FaMoon  } from 'react-icons/fa';
import './App.css';

function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(60);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const intervalRef = useRef(null);

  const startStopMetronome = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      const interval = (60 / tempo) * 1000;

      intervalRef.current = setInterval(() => {
        document.getElementById('audio-player').play();
      }, interval);
    } else {
      clearInterval(intervalRef.current);
    }
  };

  const handleTempoChange = (newTempo) => {
    setTempo(newTempo);

    if (isPlaying) {
      clearInterval(intervalRef.current);
      const interval = (60 / newTempo) * 1000;
      intervalRef.current = setInterval(() => {
        document.getElementById('audio-player').play();
      }, interval);
    }
  };

  const increaseTempo = () => {
    handleTempoChange(tempo + 1);
  };

  const decreaseTempo = () => {
    handleTempoChange(tempo - 1);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = isDarkTheme ? 'dark' : 'light';

  return (
      <div className={`metronome ${theme}`}>
        <ReactAudioPlayer
            id="audio-player"
            src="click.wav" // Replace with your own audio file
            autoPlay={false}
            controls={false}
        />
        <div className={`controls ${theme}`}>
          <div className="tempo-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={decreaseTempo} className={`button ${theme}`} style={{ background: 'none' }}>
              <FaMinus style={{ fontSize: '50px' }} />
            </button>
            <input
                className={`${theme}`}
                type="number"
                value={tempo}
                readOnly
                style={{ fontSize: '180px', textAlign: 'center', border: 'none', flex: 1, width: '65vw', background: 'none' }}
            />
            <button onClick={increaseTempo} className={`button ${theme}`} style={{ background: 'none' }}>
              <FaPlus style={{ fontSize: '50px' }} />
            </button>
          </div>
          <br />
          <button onClick={startStopMetronome} className={`button ${theme}`} style={{ fontSize: '20px', background: 'none' }}>
            {isPlaying ? 'Stop' : 'Start'}
          </button>
          <button onClick={toggleTheme} className={`button ${theme} theme-toggle-button`} style={{ fontSize: '20px', marginTop: '10px', background: 'none' }}>
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
  );
};


function App() {
  return (
      <div className="App">
        <Metronome />
      </div>
  );
}

export default App;
