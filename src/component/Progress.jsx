function Progress({points, numberOfQuestion, totalPoints, index, answer}) {
  return (
    <header className="progress">
        <progress max={numberOfQuestion} value={index + Number(answer !== null)  }/>
        <p>Question <strong>{index + 1}</strong>/{numberOfQuestion}</p>
        <p><strong>{points}</strong>/{totalPoints} Points</p>
      
    </header>
  )
}

export default Progress
