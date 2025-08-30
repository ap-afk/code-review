import React, { useEffect, useState } from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs"; 
import Markdown from 'react-markdown'  
import axios from 'axios';
function App() {
  useEffect(() => {
    prism.highlightAll();
  });

  const [code, setCode] = useState(`function sum (){
    return 1 + 2;
  }`);
const [review, setReview] = useState("");
  async function ReviewCode(){
  const response = await axios.post("http://localhost:3000/ai/get-review", { code })
  
  setReview(response.data);
  }

  return (
    <>
    <main>
      <div className="left">
    <div className="code">
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => prism.highlight(code, prism.languages.js, 'js')}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
          border: '1px solid black',
          borderRadius: '0.7rem',
          overflow: 'auto',
        }}
      />
    </div>
      <div className="review" onClick={ReviewCode}>Review</div>
      </div>
      <div className="right">
        <Markdown>{review}</Markdown>
      </div>
    </main>
    </>
  )
}

export default App