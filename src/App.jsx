import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import generateQuestion from './utils/generateQuestion'

function App() {
  const [question, setQuestion] = useState(()=>generateQuestion(1));

  return (
    <>
      <div className="min-h-screen bg-blue-100 lg:pt-4 dark:bg-blue-900 dark:text-blue-100">
        <div className="max-w-6xl mx-auto">
        <header>
          <h1 className="text-3xl font-bold text-center mb-8">Math Quiz Battle</h1>
        </header>

        <main className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <section className='md:col-span-2 bg-white dark:bg-black p-4 rounded-lg shadow-lg'>


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

          </section>
          {/* // sidebar */}
        </main>
        </div>
      </div>
    </>
  )
}

export default App
