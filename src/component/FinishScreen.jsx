function FinishScreen({ highScore, points, dispatch, totalPoints }) {
    const percentage = Math.ceil((points / totalPoints) * 100)
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
    return (
        <>
            <p className="result">
                <span>{emoji}</span>You sroced {points} out of {totalPoints} ({percentage}%)
            </p>
            <p className="highscore">HighScore: {highScore} Points</p>
            <button className="btn btn-ui" onClick={() => {dispatch({type: 'reset'})}}>Restart Quiz</button>
        </>
    )
}

export default FinishScreen
