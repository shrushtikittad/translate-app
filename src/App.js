import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// const axio = require('axios').default;

function App() {
  const [options, setOptions] = useState([])
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
    //curl -X POST "https://libretranslate.de/translate" -H "accept: application"
    
    const params = new URLSearchParams();
    params.append('q',input);
    params.append('source',from);
    params.append('target',to);
    params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    
    axios.post('https://libretranslate.de/translate',
    params,
      { headers: { 'accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded', 
    },
     }).then(res=>{
      console.log(res.data)
      setOutput(res.data.translatedText)
     })
  }

  useEffect(() => {
    axios.get('https://libretranslate.de/languages',
      { headers: { 'accept': 'application/json' } }).then(res => {
        console.log(res.data);
        setOptions(res.data);
      })
  }, [])
  // curl - X 'GET' \
  // 'https://libretranslate.de/languages' \
  // -H 'accept: application/json'
  return (
    <div className="App">
      <div>
        From ({from}) :
        <select onChange={e => setFrom(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
        To ({to}) :
        <select onChange={e => setTo(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
      </div>
      <div>
        <textarea cols="50" rows="8" onInput={(e) => setInput(e.target.value)}></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={e=>translate()}>Translate</button>
      </div>
    </div> 
  );
  }


export default App;
