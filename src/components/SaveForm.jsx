import React, { useState } from 'react';

const SaveForm = ({ onSave }) => {
    const [name, setName] = useState("");
    return (
        <form onSubmit={
                  (e) => {
                    e.preventDefault();
                    onSave(name);
                    setName("");
                  }
                }>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 px-2 py-1 rounded border bg-white dark:bg-green-900" />
                  <button type="submit" className="px-2 py-1 bg-green-600 texdt-white rounded border border-green-600">Save</button>
                </form>
    );
};

export default SaveForm;