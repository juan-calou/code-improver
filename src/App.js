import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [improvedCode, setimprovedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const HandleSubmit = e => {
    setLoading(true);
    e.preventDefault();
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(text),
        temperature: 0.6,
        max_tokens: 100,
      })
      .then(res => {
        if (res.status === 200) {
          setLoading(false);
          setimprovedCode(res?.data?.choices[0]?.text);
        }
      })
      .catch(err => {
        console.log(err, "An error occured");
      });
  };

  function generatePrompt(text) {
    return `Summarize this ${text}. and break them into seperate lines`;
  }

  return (
    <div className="App_">
      <div className="header">
        <h1 className="header_text">
          Code <span className="text_active">Improver</span>
        </h1>
        <h2 className="header_summary">Imrpove your code</h2>
      </div>
      <div className="container">
        <div className="text_form">
          <form>
            <label>Enter your code</label>
            <textarea
              rows={14}
              cols={80}
              placeholder="Source code"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </form>
        </div>
        <div>
          <button type="button" onClick={HandleSubmit}>
            {loading ? "loading..." : "Imrpovements"}
          </button>
        </div>
        <div className="summarized_text">
          <label>Improved code</label>
          <textarea
            placeholder="Improved code"
            cols={80}
            rows={14}
            value={improvedCode}
            onChange={e => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
