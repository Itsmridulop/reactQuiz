import { useReducer } from "react";

const reducer = (state, action) => {
  console.log(action)
  switch(action.type){
    case 'inc':
      return {...state, count: state.count + state.step}
    case 'dec':
      return {...state, count: state.count - state.step}
    case 'reset':
      return {...state, count: 0, step: 1}
    case 'setCount':
      return {...state, count: action.payload}
    case 'setStep':
      return {...state, step: action.payload}
    default:
      throw new Error('Invalid action')
  }
}

function DateCounter() {
  const initailState = {count: 0, step: 1}
  const [state, dispatch] = useReducer(reducer, initailState);
  const {count, step} = state

  const date = new Date();
  date.setDate(date.getDate() + count);
  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={e => dispatch({type: 'setStep', payload: Number(e.target.value)})}/>
        <span>{step}</span>
      </div>
      <div>
        <button onClick={() => dispatch({type: 'dec'})}>-</button>
        <input value={count} onChange={e => dispatch({type: 'setCount', payload: isNaN(Number(e.target.value)) ? 0 : Number(e.target.value) })} />
        <button onClick={() => dispatch({type: 'inc'})}>+</button>
      </div>
      <p>{date.toDateString()}</p>
      <div>
        <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;