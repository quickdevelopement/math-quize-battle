import { useEffect, useRef, useState } from 'react'
import './App.css'
import generateQuestion from './utils/generateQuestion'
import ThemeMode from './components/ThemeMode'
import GameControllerButton from './components/GameControllerButton'
import TimeBar from './components/TimeBar'
import QusetionAnswer from './components/QusetionAnswer'
import Sidebar from './components/Sidebar'



function App() {
  const [question, setQuestion] = useState(() => generateQuestion(1));
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [timmer, setTimmer] = useState(12);





  // timmer
  const timeRef = useRef(null);

  useEffect(() => {
    if (running) {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      };
      timeRef.current = setInterval(() => {
        setTimmer((prevTime) => prevTime - 1);
      }, 1000);

    }
    return () => { if (timeRef.current) clearInterval(timeRef.current) };
  }, [running]);

  useEffect(() => {
    if (timmer <= 0 && running) {
      handleWrong("Time Out");
    }
  }, [timmer]);


  const startGame = () => {
    setRunning(true);
    setScore(0);
    setStreak(0);
    setLevel(1);
    setMessage("");
    setQuestion(generateQuestion(level));
    setTimmer(12);
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
    setTimmer(t => t);
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
    const newLevel = Math.min(20, Math.floor((streak + 1) / 5) + 1);
    setLevel(newLevel);

    //smal Delay
    setTimeout(() => nextQuestion(newLevel), 1000);
  };

  const handleWrong = (reson = "Wrong") => {
    setMessage(reson + " . Answer: " + question.correct);
    setStreak(0);

    setScore((ps) => Math.max(0, ps - Math.floor(level * 2)));

    setLevel((lv) => Math.max(1, Math.floor(lv * 0.8)));


    setTimeout(() => nextQuestion(level), 1000);
  };

  const nextQuestion = (newLevel = level) => {
    setQuestion(generateQuestion(newLevel));
    setTimmer(Math.max(6, 12 - Math.floor(newLevel / 2)));


  }

  const percentTime = Math.max(0, Math.min(100, Math.round(timmer / Math.max(6, 12 - Math.floor(level / 2)) * 100)));



  return (
    <>
      <div className="min-h-screen bg-blue-100 lg:pt-4 dark:bg-blue-900 dark:text-blue-100">
        <div className="max-w-6xl mx-auto">
          <header className='flex justify-between mb-5'>
            <h1 className="text-3xl font-bold text-center mb-8">Math Quiz Battle</h1>
            <ThemeMode />
          </header>

          <main className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <section className='md:col-span-2 bg-white dark:bg-black p-4 rounded-lg shadow-lg'>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-2xl text-yellow-700 font-bold dark:text-yellow-400">Level <span>{level}</span></div>
                  <div className="text-md font-medium text-green-500 dark:text-blue-200">Streak: {streak} Score: {score}</div>
                </div>
                {/* Game Crontroller Button  */}
                <GameControllerButton
                  running={running}
                  score={score}
                  startGame={startGame}
                  stopGame={stopGame}
                  handlePuse={handlePuse}
                  handleReset={handleReset}
                />
              </div>

              {/* Timmer Bar  */}

              <TimeBar timmer={timmer} percentTime={percentTime} />


              {/* Questions  */}
              <QusetionAnswer question={question} chooseOption={chooseOption} />
              
              <div className="mt-4 text-sm text-green-600 dark:text-blue-300">{message}</div>
            </section>
            {/* // sidebar */}
            <Sidebar score={score} streak={streak} level={level} />
          </main>
        </div>
      </div>
    </>
  )
}

export default App
