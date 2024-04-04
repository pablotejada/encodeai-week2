'use client';

import React from 'react';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* Add the default first text paragraph */}
      <p className="whitespace-pre-wrap"> 
      Hello! I will tell you a joke, but first, pick a topic from a list of options (work, people, animals, food, television, etc), a tone for the joke (witty, sarcastic, silly, dark, goofy, etc), 
      the kind of joke (pun, knock-knock, story, etc), and the "temperature" of it 
      (how much randomness/fun you want to add to the joke). You can write me a first prompt to tell me options like this:
      
      work, witty, story, high</p>

      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
