import React from 'react'

function QuestionText({ id, question }) {
    return (
        <div key={id} className="p-4 border rounded-lg">
            <p>{id}. {question}</p>
        </div>
    )
}

export default QuestionText