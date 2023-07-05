const Header = ({ coursename }) => <h1>{coursename}</h1>;

// Unused in this part
// const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Content = ({ parts }) => (
  parts.map(p => <Part key={p.id} part={p}/>)
);

const Course = ({course}) => (
  <div>
    <Header coursename={course.name} />
    <Content parts={course.parts} />
  </div>
);

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Another part I just made up!',
        exercises: 0,
        id: 4
      }
    ]
  };

  return (
    <Course course={course}/>
  );
}

export default App;