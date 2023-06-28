
const Header = ({course}) => (
  <div>
    <h1>{course}</h1>
  </div>
);

const Content = ({parts}) => {
  // Given the "unique prop key" warning this produces, I get that this must be
  // the wrong way of doing this, but for the purposes of these first examples
  // I'm just sucking it up now that I have something that works
  // 
  // https://reactjs.org/link/warning-keys
  let ret = parts.map(data => {
    return(<Part data={data}/>);
  });

  return(
    <div>
      {ret}
    </div>
  );
};

const Part = ({data}) => (
  <div>
    <p>{data.name} {data.exercises}</p>
  </div>
);

const Total = ({parts}) => {
  let sum = parts.reduce((accum, data) => accum += data.exercises, 0);
  return(<p>Number of exercises {sum}</p>);
};

const App = () => {
  const COURSE = "Half Stack application development";
  const PART1 = {
    name: "Fundamentals of React",
    exercises: 10
  };
  const PART2 = {
    name: "Using props to pass data",
    exercises: 7
  };
  const PART3 = {
    name: "State of a component",
    exercises: 14
  };
  
  const PARTS = [PART1, PART2, PART3];

  return(
    <div>
      <Header course={COURSE} />
      <Content parts={PARTS} />
      <Total parts={PARTS} />
    </div>
  )
};

export default App;