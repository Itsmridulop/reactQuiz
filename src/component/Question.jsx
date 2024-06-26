function Question({ question, dispatch, answer }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
                {question.options.map((option, index) => 
                    <button disabled={answer !== null} className={`btn btn-option ${index === answer  ? 'answer' : ''} ${ answer !== null ? index === question.correctOption ? 'correct' : 'wrong' : ''}`} key={option} onClick={() => {dispatch({type: 'newAnswer', payload: index})}}>{option}</button>
                )}
            </div>
        </div> 
    )
}

export default Question
