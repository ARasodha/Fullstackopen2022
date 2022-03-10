import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}
const StatisticsLine = (props) => {
  return (
    <>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    </>
  )
};

const Statistics = (props) => {
  let average = (props.good * 1) + (props.neutral * 0) + (props.bad * -1) * .100;
  let total = props.good + props.neutral + props.bad;
  let positive = (props.good / total) * 100 || 0;

  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
    )
  }

  return (
    <div>
      No feedback given
    </div>
  )
}

const Anecdote = (props) => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  let [voteCount, setVoteCount] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0});

  let randomIndex = selected;

  let handleAnecdote = () => {
    randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }
  
  let handleVotes = () => {
    let votesCopy = Object.assign({}, voteCount);
    votesCopy[String(randomIndex)]++;
    setVoteCount(votesCopy)
  }

  let anecdotesIdx = Object.keys(voteCount);
  let mostVotesIdx = 0;
  anecdotesIdx.forEach(aIdx => {
    if (voteCount[aIdx] > voteCount[mostVotesIdx]) {
      mostVotesIdx = aIdx;
    }
  });


  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {voteCount[randomIndex]} votes</p>
      <Button onClick={handleVotes} text="vote" />
      <Button onClick={handleAnecdote} text="next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVotesIdx]}</p>
      <p>has {voteCount[mostVotesIdx]} votes</p>
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let handleGood = () => setGood(good + 1);
  let handleNeutral = () => setNeutral(neutral + 1);
  let handleBad = () => setBad(bad + 1);

  return (
    <div>
      <Anecdote />
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App