function NextButton({ dispatch, numberOfQuestion, index, answer }) {
    if (answer === null) return
    return (
        <button className="btn btn-ui" onClick={() => { dispatch(index + 1 === numberOfQuestion ? { type: 'finishQuiz' } : { type: 'nextQuestion' }) }}>
            {index === numberOfQuestion-1 ? 'Finish' : 'Next'}
        </button>
    )
}

export default NextButton
