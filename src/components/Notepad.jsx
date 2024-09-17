import React, { useState } from 'react';

const Notepad = () => {
    const [ text, setText ] = useState('');
    const [ fileName, setFileName ] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[ 0 ];
        if (file)
        {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                setText(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleSaveFile = () => {
        const blob = new Blob([ text ], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName || 'untitled.txt';
        link.click();
    };

    return (
        <div>
            <input type="file" accept=".txt" onChange={ handleFileChange } />
            <textarea
                value={ text }
                onChange={ (e) => setText(e.target.value) }
                rows="20"
                cols="80"
            />
            <br />
            <button onClick={ handleSaveFile }>Save</button>
        </div>
    );
};

export default Notepad;