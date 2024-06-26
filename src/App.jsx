import { useEffect, useReducer } from 'react'
import Header from './component/Header'
import Mian from './component/Mian'
import Loader from './component/Loader'
import Error from './component/Error'
import StarScreen from './component/StarScreen'
import Question from './component/Question'
import NextButton from './component/NextButton'
import Progress from './component/Progress'
import FinishScreen from './component/FinishScreen'
import Footer from './component/Footer'
import Timer from './component/Timer'
const SECS_PRE_QUES = 20

const initailState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  highScore: 0,
  points: 0,
  secondRemaining: null
}

const reduser = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready' }
    case 'errorOccured':
      return { ...state, status: 'errors' }
    case 'start':
      return {...state, status: 'active', secondRemaining: state.questions.length * SECS_PRE_QUES}
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {...state,points:action.payload === question.correctOption ?  state.points + question.points : state.points, answer: action.payload}
    case 'nextQuestion':
      return {...state, index: state.index + 1, answer: null}
    case 'finishQuiz':
      return {...state, status: 'finish', highScore: state.highScore > state.points ? state.highScore :  state.points}
    case 'reset':
      return {...state, status: 'ready', index: 0, answer: null, points: 0}
    case 'setTimer': 
      return {...state, secondRemaining: state.secondRemaining - 1}
    default:
      throw new Error('Invalid action')
  }
}

function App() {
  const [ { highScore, questions, status, index, answer, points, secondRemaining } , dispatch] = useReducer(reduser, initailState)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/questions')
        if (!res.ok) throw new Error('unable to fetch data...')
        const data = await res.json()
        dispatch({ type: 'dataReceived', payload: data })
      } catch (error) {
        dispatch({ type: 'errorOccured' })
      }
    }
    fetchData()
  }, [])
  const totalPoints = questions.reduce((prev, curr) => prev+curr.points,0)
  return (
    <div className='app' >
      <Header />
      <Mian>
        {status === 'loading' && <Loader />}
        {status === 'ready' && <StarScreen numberQuestion={questions.length} dispatch={dispatch}/>}
        {status === 'errors' && <Error />}
        {status === 'active' && <><Progress points={points} index={index} numberOfQuestion={questions.length} totalPoints={totalPoints} answer={answer}/><Question question={questions[index]} dispatch={dispatch} answer={answer}/><Footer><NextButton dispatch={dispatch} answer={answer} numberOfQuestion={questions.length} index={index}/><Timer secondRemaining={secondRemaining} dispatch={dispatch}/></Footer></>}
        {status === 'finish' && <FinishScreen points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch}/>}
      </Mian>
    </div>
  )
}

export default App
