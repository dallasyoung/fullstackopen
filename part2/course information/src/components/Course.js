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

export default Course;