import { useState } from "react";

const Header = () => (<h1>Give feedback</h1>);

const Controls = ({stats, updateStats}) => (
  <div>
    <Button text="good" handler={()=>(updateStats([stats[0] + 1, stats[1], stats[2]]))}/>
    <Button text="neutral" handler={()=>(updateStats([stats[0], stats[1] + 1, stats[2]]))}/>
    <Button text="bad" handler={()=>(updateStats([stats[0], stats[1], stats[2] + 1]))}/>
  </div>
);

// 1.10 - Whoops, done!
const Button = ({text, handler}) => (
  <>
    <button onClick={handler}>{text}</button>
  </>
);

const StatisticLine = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>);

// 1.8 - Whoops, already took care of this
const Statistics = ({stats}) => {
  const all = (stats[0] + stats[1] + stats[2]);
  const avg = (stats[0] - stats[2]) / all;
  const pos = (stats[0] / all) * 100;

  if(all > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={stats[0]} />
            <StatisticLine text={"neutral"} value={stats[1]} />
            <StatisticLine text={"bad"} value={stats[2]} />
            <StatisticLine text={"all"} value={all} />
            <StatisticLine text={"average"} value={avg} />
            <StatisticLine text={"positive"} value={pos} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return(<div><h1>Statistics</h1><p>No feedback given</p></div>);
  }
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