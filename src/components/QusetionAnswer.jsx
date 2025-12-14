import React from 'react';

const QusetionAnswer = ({ question, chooseOption }) => {
    return (
        <>
            <div className="mb-4 p-4 bg-green-100 dark:bg-green-200 border rounded">
                <h2 className="text-2xl md:text-4xl font-semibold dark:text-green-800">{question.questionText} = ?</h2>
                <div className="text-sm text-green-500 dark:text-green-400">Pick the corrrect answer</div>
            </div>
            {/* options */}
            <div className="grid grid-cols-2 gap-3">
                {
                    question.options.map((option, idx) => (
                        <button
                            onClick={() => chooseOption(option)}
                            key={idx}
                            className='p-4 rounded-lg bg-green-100 dark:green-200 border hover:shadow transition text-left'
                        >
                            <div className='text-2xl dark:text-green-900 font-medium cursor-pointer'>
                                {option}
                            </div>
                        </button>
                    ))
                }
            </div>
        </>
    );
};

export default QusetionAnswer;