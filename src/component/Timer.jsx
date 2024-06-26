import { useEffect } from "react"

function Timer({secondRemaining, dispatch}) {
  useEffect(() => {
    const timerId = setInterval(() => dispatch(secondRemaining === 0 ? {type: 'finishQuiz'} : {type: 'setTimer'}), 1000)
    return () => clearInterval(timerId)
  }, [dispatch])
  if(secondRemaining === 0) dispatch({type: 'finishQuiz'})
  return (
    <div className="timer">
      {(Math.ceil(secondRemaining / 60) > 9 ? Math.ceil(secondRemaining / 60) - 1 : '0' + (Math.ceil(secondRemaining / 60) - 1)) + ':' + (secondRemaining % 60 > 9 ? secondRemaining % 60 : '0' + secondRemaining % 60)}
    </div>
  )
}

export default Timer
