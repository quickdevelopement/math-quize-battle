import React from 'react';

const TimeBar = ({ timmer, percentTime}) => {
    return (
        <div className="mb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded overflow-hidden">
                <div className="h-3 rounded trasition-all bg-green-800 dark:bg-green-200" style={{ width: `${percentTime}%` }}></div>
            </div>
            <p className='text-md.text-gray-500.dark:text-green-400 mt-1'>Time Left: {timmer} Second</p>
        </div>
    );
};

export default TimeBar;