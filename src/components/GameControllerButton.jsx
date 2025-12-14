

import React from 'react';

const GameControllerButton = ({ running, score, startGame, stopGame, handlePuse, handleReset }) => {
    return (
        <div className="space-x-2">
                  {
                    !running && score === 0 ? (
                      <button onClick={startGame} className='px-3 py-1 bg-blue-600 text-white rounded'>Start</button>
                    ) : (
                      <button onClick={stopGame} className='px-3 py-1 bg-red-600 text-white rounded'>Stop</button>

                    )
                  }

                  {
                    score > 0 && (
                      <button onClick={handlePuse} className='px-3 py-1 bg-green-600 text-white rounded'>Puse</button>
                    )
                  }
                  <button onClick={handleReset} className='px-3 py-1 bg-yellow-600 text-white rounded'>Reset</button>
                </div>
    );
};

export default GameControllerButton;