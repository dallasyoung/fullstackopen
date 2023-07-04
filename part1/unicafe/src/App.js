import { useState } from "react";

const Header = () => (<h1>Give feedback</h1>);

const Controls = ({stats, updateStats}) => (
  <div>
    <Button text="good" handler={()=>(updateStats([stats[0] + 1, stats[1], stats[2]]))}/>
    <Button text="neutral" handler={()=>(updateStats([stats[0], stats[1] + 1, stats[2]]))}/>
    <Button text="bad" handler={()=>(updateStats([stats[0], stats[1], stats[2] + 1]))}/>
  </div>
);

const Button = ({text, handler}) => (
  <>
    <button onClick={handler}>{text}</button>
  </>
);

const StatItem = ({text}) => (<li>{text}</li>);

const Statistics = ({stats}) => {
  const all = (stats[0] + stats[1] + stats[2]);
  const avg = (stats[0] - stats[2]) / all;
  const pos = (stats[0] / all) * 100;

  return (
    <div>
      <h1>Statistics</h1>
      <ul>
        <StatItem text={"good: " + stats[0]} />
        <StatItem text={"neutral: " + stats[1]} />
        <StatItem text={"bad: " + stats[2]} />
        <StatItem text={"all: " + all} />
        <StatItem text={"average: " + avg} />
        <StatItem text={"positive: " + pos} />
      </ul>
    </div>
    );
};

const App = () => {
  // This is a dumb way of doing things and makes the event handling code more
  // Difficult to read. If this were a prod app I was working seriously on,
  // this would be a smarter datastructure or something. Works fine for this
  // assignment though
  let [stats, updateStats] = useState([0,0,0]);

  return(
    <>
      <Header />
      <Controls stats={stats} updateStats={updateStats}/>
      <Statistics stats={stats}/>
    </>
  );
};

export default App;