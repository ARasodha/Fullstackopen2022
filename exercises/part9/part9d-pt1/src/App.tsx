interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface Description extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends Description {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends Description {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseStackPart extends Description {
  type: "special";
  requirements: string [];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseStackPart;

const Header = ({ courseName }: { courseName: string }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p><em>{part.description}</em></p>
        </>
      );
    case 'groupProject':
      return (
        <>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case 'submission':
      return (
        <>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p><em>{part.description}</em></p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </>
      );
    case 'special':
      return (
        <>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p><em>{part.description}</em></p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart [] }) => {
  return (
    <div>
      {courseParts.map((part, i) =>
        <Part key={i} part={part} />
      )}
    </div>
  )
};

const Total = ({ courseParts }: { courseParts: CoursePart [] }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
};

export default App;