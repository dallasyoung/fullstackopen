class PartData {
  constructor(name, numExercises) {
    this.name = name;
    this.numExercises = numExercises;
  }
};

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
    return(<p>{data.name} {data.numExercises}</p>);
  });

  return(
    <div>
      {ret}
    </div>
  );
};

const Total = ({parts}) => {
  let sum = parts.reduce((accum, data) => accum += data.numExercises, 0);
  return(<p>Number of exercises {sum}</p>);
};

const App = () => {
  const COURSE     = "Half Stack application development";
  const PART1      = "Fundamentals of React";
  const EXERCISES1 = 10;
  const PART2      = "Using props to pass data";
  const EXERCISES2 = 7;
  const PART3      = "State of a component";
  const EXERCISES3 = 14;
  
  const PARTS = [
    new PartData(PART1, EXERCISES1),
    new PartData(PART2, EXERCISES2),
    new PartData(PART3, EXERCISES3)
  ];

  return(
    <div>
      <Header course={COURSE} />
      <Content parts={PARTS} />
      <Total parts={PARTS}/>
    </div>
  )
};

export default App;