import React, { useState } from 'react';
import SaveForm from './SaveForm';

const STORAGE_KEY = "math_quize_battle_leaderboard";

const Sidebar = ({ score, streak, level }) => {
     const [leaderboard, setLeaderboard] = useState(() => {
        try {
          return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch (error) {
          return [];
        }
      });
      
    
      const onSave = (name) => {
        const rec = { name: name || "Anonymous", score, date: new Date().toISOString() };
        const newBoard = [...leaderboard, rec].sort((a, b) => b.score - a.score).slice(0, 10);
        setLeaderboard(newBoard);
    
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newBoard));
        } catch (error) {
          alert("Error saving leaderboard to local storage")
        }
      }
    
      const resetLeaderboard = () => {
        if (!confirm('Are you sure you want to reset the leaderboard?')) {
          return;
        }
        setLeaderboard([]);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
          alert("Error resetting leaderboard");
    
        }
      }
    return (
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
                  leaderboard.length === 0 ? (
                    <div className="text-md text-red-500">No Record Yet</div>
                  ) : (
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
                <SaveForm onSave={onSave} />
              </div>
              <div className="flex gap-2">
                <button onClick={resetLeaderboard} className="px-2 py-1 border rounded text-sx">Clear</button>
                <button
                  onClick={() => {
                    setLeaderboard(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"))
                  }}
                  className="px-2 py-1 border rounded text-sx">Reload</button>
              </div>
            </aside>
    );
};

export default Sidebar;