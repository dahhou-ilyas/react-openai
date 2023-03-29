import './App.css';
import { useState } from 'react';
import { OpenAIApi , Configuration } from 'openai';
import React from 'react';


function App() {
  const configuration=new Configuration({
    apiKey:process.env.REACT_APP_OPENAI_API_KEY,
  })
  const openai =new OpenAIApi(configuration)

  const [prompt,setPrompt]=useState('')
  const [result,setResult]=useState('')
  const [loading,setLoading]=useState(false)

  const handleClick =async ()=>{
    setLoading(true)
    try{
      const response =await openai.createCompletion({
        model :"text-davinci-003",
        prompt:prompt,
        temperature:0.5,
        max_tokens:100,
      })
      setResult(response.data.choices[0].text);
    }catch(e){
      console.error(e)
    }
    setLoading(false)
  }
  return (
    <main className="App">
      <div className='content'>

        <textarea
          type="text"
          value={prompt}
          onChange={(e)=> setPrompt(e.target.value)}
          placeholder="Write yout prompt !!!!"
          className='textarea'
        ></textarea>

        <button
          onClick={handleClick}
          disabled={loading || prompt.length===0}
          className='btn'
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        <pre className='result'>{result}</pre>
      </div>
    </main>
  );
}

export default App;
