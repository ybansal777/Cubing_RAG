//import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypingAnim = () => {
  return (
    <TypeAnimation
        sequence = {[
            "Welcome to the Cubing-RAG Model", 1000,
            "Built with OpenAI and LlamaIndex", 1500,
            "Your own customized chatbot about the WCA Rules", 2000
        ]}
        speed = {50}
        style = {{fontSize: '50px', color: "white", display: "inline-block", textShadow: "1px 1px 20px #000"}}
        repeat = {Infinity}
    />
  );
};

export default TypingAnim