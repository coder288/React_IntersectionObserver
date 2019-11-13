import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./app.css";

const App = props => {
  const redBlock = useRef("red");
  const greenBlock = useRef("green");

  let callback = enteries => {
    enteries.forEach(entry => {
      console.log(entry.isIntersecting);
    });
  };

  const [state, setState] = useState(false);

  useEffect(() => {
    console.log("observer ON");
    const green = greenBlock.current;
    let observer = new IntersectionObserver(callback);

    observer.observe(green);

    return () => {
      console.log("observer OFF");
      observer.unobserve(green);
    };
  }, [state]);

  return (
    <>
      <div className="red" ref={redBlock} />
      <div className="green" ref={greenBlock}>
        <button
          onClick={() => {
            const rootElement = document.getElementById("root");
            ReactDOM.render(<div>123</div>, rootElement);
          }}
        >
          {state.toString()}
        </button>
      </div>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
