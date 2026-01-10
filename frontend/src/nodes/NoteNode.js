import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
    const [text, setText] = useState(data?.text || '');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Sticky Note"
            handles={[]} // સ્ટીકી નોટને ટપકાં ન હોય
            style={{
                backgroundColor: '#feff9c',
                // મહત્વનું: અહીં resize આપ્યું છે એટલે આખું બોક્સ ખેંચાશે
                width: '200px',
                height: '150px',
                resize: 'both',
                overflow: 'hidden',
            }}
        >
            <textarea
                className="nodrag"
                value={text}
                onChange={handleChange}
                placeholder="Type note..."
                style={{
                    width: '100%',
                    height: '100%',
                    resize: 'none', // અંદરના બોક્સને ડબલ resize ન કરવું પડે
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'cursive',
                    fontSize: '14px',
                    color: '#333',
                    overflow: 'auto' // લખાણ વધે તો સ્ક્રોલ આવે
                }}
            />
        </BaseNode>
    );
};