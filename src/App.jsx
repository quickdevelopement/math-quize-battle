import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import generateQuestion from './utils/generateQuestion'

const STORAGE_KEY = "math_quize_battle_leaderboard";

function App() {
  const [question, setQuestion] = useState(() => generateQuestion(1));
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [timmer, setTimmer] = useState(12);
  // Leader Board
  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (error) {
      return [];
    }
  });
  const [name, setName] = useState("");

  const onSave = (name)=>{
    const rec = {name: name || "Anonymous", score, date: new Date().toISOString()};
    const newBoard = [...leaderboard, rec].sort((a,b)=> b.score - a.score).slice(0, 10);
    setLeaderboard(newBoard);

    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBoard));
    }catch(error){
      alert("Error saving leaderboard to local storage")
    }
  }

  const resetLeaderboard = ()=>{
    if(!confirm('Are you sure you want to reset the leaderboard?')){
      return;
    }
    setLeaderboard([]);
    try{
      localStorage.removeItem(STORAGE_KEY);
    }catch(error){
      alert("Error resetting leaderboard");
    
    }
  }




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

              {/* Timmer Bar  */}

              <div className="mb-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded overflow-hidden">
                  <div className="h-3 rounded trasition-all bg-green-800 dark:bg-green-200" style={{ width: `${percentTime}%` }}></div>
                </div>
                <p className='text-md.text-gray-500.dark:text-green-400 mt-1'>Time Left: {timmer} Second</p>
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
            <aside className='bg-green-100 dark:bg-black p-4 rounded-lg shadow'>
              <div className="mb-3">
                <div className="font-semibold text-2xl">Quize Status</div>
                <div className="text-xl text-green-800 dark:text-green-100">Score: <span className='font-medium'>{score}</span></div>
                <div className="text-xl text-green-800 dark:text-green-100">Streak: <span className='font-medium'>{streak}</span></div>
                <div className="text-xl text-green-800 dark:text-green-100">Level: <span className='font-medium'>{level}</span></div>
              </div>
              {/* learder Board  */}
                <div className="mb-3">
                  <div className="font-semiboard text-2xl">Leaderboard</div>
                  {
                    leaderboard.length === 0 ?(
                      <div className="text-md text-red-500">No Record Yet</div>
                    ):(
                      leaderboard.map((record, idx) => (
                        <li key={idx} className="flex justify-between text-xl dark:text-green-100">
                          <span>{idx + 1}. {record.name}</span>
                          <span className='font-medium'>{record.score}</span>
                        </li>
                      ))
                    )
                  }
                </div>
                {/* save Form  */}
               <div className="mb-4">
                 <h3>Save Score</h3>
                <form onSubmit={
                  (e)=>{
                    e.preventDefault();
                    onSave(name);
                    setName("");
                  }
                }>
                  <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} className="flex-1 px-2 py-1 rounded border bg-white dark:bg-green-900" />
                  <button type="submit" className="px-2 py-1 bg-green-600 texdt-white rounded border border-green-600">Save</button>
                </form>
               </div>
               <div className="flex gap-2">
                <button onClick={resetLeaderboard} className="px-2 py-1 border rounded text-sx">Clear</button>
                <button
                  onClick={()=>{
                    setLeaderboard(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"))
                  }}
                className="px-2 py-1 border rounded text-sx">Reload</button>
               </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
