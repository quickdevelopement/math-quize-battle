import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import generateQuestion from './utils/generateQuestion'

function App() {
  const [question, setQuestion] = useState(() => generateQuestion(1));
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");

  const startGame = () => {
    setRunning(true);
    setScore(0);
    setStreak(0);
    setLevel(1);
    setMessage("");
    setQuestion(generateQuestion(level));
    // tiemmer
    // sound
  }

  const stopGame = () => {
    setRunning(false);
    setMessage("Game Stop");
  };


  const handlePuse = () => {
    setRunning(!running);
    setMessage(running ? "Game Paused" : "Game Resumed");
    setScore(s => s);
    setStreak(s => s);
    setLevel(l => l);
    setQuestion(q => q);
    // tiemmer
  };

  const handleReset = () => {
    setScore(0);
    setStreak(0);
    setLevel(1);
    setRunning(false);
    setMessage("Reset Store");
  }

  const chooseOption = (opt) => {
    // sound
    if (!running) return;

    if (opt === question.correct) {
      handleCorrect();
    } else {
      handleWrong();

    }
  };

  const handleCorrect = () => {
    const base = 10 + level + 2;
    const streakBonus = Math.floor(streak / 3) * 5;
    const points = base + streakBonus;
    setScore(prevScore => prevScore + points);
    setStreak(prevStreak => prevStreak + 1);
    setMessage('Correct + ' + points);
    

    // level up every 5 correct
    const newLevel = Math.min(20, Math.floor((streak + 1) / 5) +1);
    setLevel(newLevel);

    //smal Delay
    setTimeout(()=>nextQuestion(newLevel), 1000);
  };

  const handleWrong = (reson = "Wrong") => {
    setMessage(reson + " . Answer: "+ question.correct);
    setStreak(0);

    setScore((ps)=>Math.max(0, ps - Math.floor(level *2)));

    setLevel((lv)=> Math.max(1, Math.floor(lv * 0.8)));


    setTimeout(()=>nextQuestion(level), 1000);
  };

  const nextQuestion = (newLevel = level) => {
    setQuestion(generateQuestion(newLevel));
    // timmer


  }



  return (
    <>
      <div className="min-h-screen bg-blue-100 lg:pt-4 dark:bg-blue-900 dark:text-blue-100">
        <div className="max-w-6xl mx-auto">
          <header>
            <h1 className="text-3xl font-bold text-center mb-8">Math Quiz Battle</h1>
          </header>

          <main className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <section className='md:col-span-2 bg-white dark:bg-black p-4 rounded-lg shadow-lg'>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-2xl text-yellow-700 font-bold dark:text-yellow-400">Level <span>{level}</span></div>
                  <div className="text-md font-medium text-green-500 dark:text-blue-200">Streak: {streak} Score: {score}</div>
                </div>
                {/* Game Crontroller Button  */}
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
              </div>

              {/* Questions  */}
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
              <div className="mt-4 text-sm text-green-600 dark:text-blue-300">{message}</div>
            </section>
            {/* // sidebar */}
          </main>
        </div>
      </div>
    </>
  )
}

export default App
