import React, { useEffect, useState } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`function sum () {
  return 1 + 2;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function ReviewCode() {
    try {
      setLoading(true);
      const response = await axios.post("https://code-review-gnh1.onrender.com/ai/get-review", { code });
      setReview(response.data);
    } catch (err) {
      setReview("❌ Error reviewing code. Check server console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <section className="left-pane">
        <h2>🧑‍💻 Code Editor</h2>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(v) => prism.highlight(v, prism.languages.js, "js")}
          padding={12}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 15,
            borderRadius: "8px",
            background: "#1e1e1e",
            color: "#fff",
            minHeight: "300px",
          }}
        />

        <button className="review-btn" onClick={ReviewCode} disabled={loading}>
          {loading ? "Analyzing..." : "Review Code"}
        </button>
      </section>

      <section className="right-pane">
        <h2>🔍 AI Review</h2>
        <div className="review-box">
          {review ? (
            <Markdown>{review}</Markdown>
          ) : (
            <p className="placeholder">AI review will appear here...</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
