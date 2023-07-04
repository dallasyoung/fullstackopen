import { useState } from "react";

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  // My solution before reading the hints included in the exercise instructions
  // const [votes, updateVotes] = useState(Array(anecdotes.length).fill().map(_ => 0));
  const [votes, updateVotes] = useState(new Uint8Array(anecdotes.length));
  const [highest, updateHighest] = useState(0);
  
  const selectRandom = () => {
    const newRandomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(newRandomNumber);
  };

  const vote = () => {
    let newVotes = [...votes]; // Careful not to modify the 'votes' React state directly here
    newVotes[selected] += 1;
    let score = newVotes[selected];
    let testHighest = votes[highest];
    if(score > testHighest) {
      updateHighest(selected);
    }
    updateVotes(newVotes);
  };

  // This conditional rendering code would be much neater if I was properly
  // using smaller subcomponents like we've done previously, I know
  if(votes.reduce((a, v) => a + v, 0) > 0) {
    return (
      <div>
        <div>
          <h1>Anecdote of the day</h1>
          <p>{anecdotes[selected]}</p>        
        </div>
        <div>
          <p>Votes: {votes[selected]}</p>
        </div>
        <div>
          <button onClick={selectRandom}>Random anectode</button>
          <button onClick={vote}>Vote for anectode</button>
        </div>
        <div>
          <h1>Highest-voted Anecdote</h1>
          <p>{anecdotes[highest]}</p>
          <p>Votes: {votes[highest]}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>Anecdote of the day</h1>
          <p>{anecdotes[selected]}</p>        
        </div>
        <div>
          <p>Votes: {votes[selected]}</p>
        </div>
        <div>
          <button onClick={selectRandom}>Random anectode</button>
          <button onClick={vote}>Vote for anectode</button>
        </div>
        <div>
          <h1>Highest-voted Anecdote</h1>
          <p>No votes yet</p>
        </div>
      </div>
    );
  }
};

export default App;
