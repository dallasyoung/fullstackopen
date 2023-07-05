const Header = ({ coursename }) => <h1>{coursename}</h1>;

const Total = ({ sum }) => <strong><p>total of {sum} exercises</p></strong>;

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Content = ({ parts }) => (
  parts.map(p => <Part key={p.id} part={p}/>)
);

// Exercise 2.3 - Already done!
const Course = ({course}) => (
  <div>
    <Header coursename={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((a, p) => a + p.exercises, 0)} />
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
        name: 'Redux',
        exercises: 11,
        id: 4
      },
      {
        name: 'Another part I just made up!',
        exercises: 0,
        id: 5
      }
    ]
  };

  return (
    <Course course={course}/>
  );
}

export default App;