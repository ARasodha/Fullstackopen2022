const Header = (props) => {
  return (
    <>
    <h1 key={props.course.id}>{props.course.name}</h1>
    </>
  )
};

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => {
        return <Part key={part.id} name={part.name} exercises={part.exercises} />
      })}
      <Total parts={props.course.parts} />
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p key={props.id}>{props.name} {props.exercises}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p><strong>Total of {props.parts.map(({exercises}) => exercises).reduce((accum, val) => accum + val)} exercises</strong></p>
    </>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
          </div>
        )
      })}
    </div>
  )
};

export default Course;