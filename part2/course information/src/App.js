const Header = ({ text }) => <h1>{text}</h1>;

const CourseHeader = ({ coursename }) => <h2>{coursename}</h2>;

const Total = ({ sum }) => <strong><p>total of {sum} exercises</p></strong>;

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Content = ({ parts }) => (
  parts.map(p => <Part key={p.id} part={p}/>)
);

// Exercise 2.3 - Already done!
const Course = ({course}) => (
  <div>
    <CourseHeader coursename={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((a, p) => a + p.exercises, 0)} />
  </div>
);

const App = () => {
  const COURSES = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <Header text="Web development curriculum" />
      {COURSES.map(c => <Course key={c.id} course={c} />)}
    </div>
  );
};

export default App;