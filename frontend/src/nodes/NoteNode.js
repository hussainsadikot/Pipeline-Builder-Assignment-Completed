// frontend/src/nodes/noteNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';
// import { Position } from 'reactflow';

export const NoteNode = ({ id, data }) => {
    const [text, setText] = useState(data?.text || '');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Sticky Note" // હેડરનું નામ
            handles={[
                // Note ને સામાન્ય રીતે હેન્ડલ નથી હોતા, પણ જો જોઈતા હોય તો જ રાખજો
                // અત્યારે મેં ખાલી રાખ્યા છે, તમે ઉમેરી શકો છો
            ]}
            style={{
                // 1. Sticky Note જેવો પીળો કલર
                background: '#fef3c7',
                borderColor: '#f59e0b',
                width: '100%',
                height: '100%'
            }}
        >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    color: '#b45309',
                    fontSize: '11px',
                    marginBottom: '5px',
                    fontWeight: '600'
                }}>
                    Type note...
                </div>

                <textarea
                    className="nodrag" // આ ક્લાસ જરૂરી છે જેથી લખતી વખતે નોડ ડ્રેગ ન થાય
                    value={text}
                    onChange={handleChange}
                    style={{
                        // --- આ તમારું સોલ્યુશન છે ---
                        resize: 'both', // આનાથી ખૂણામાં લીટીઓ આવશે અને તમે ખેંચી શકશો

                        width: '100%',
                        height: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontFamily: 'cursive', // અથવા 'sans-serif', હાથથી લખ્યું હોય તેવું લાગે
                        fontSize: '14px',
                        color: '#451a03',
                        overflow: 'auto' // જરૂર પડે તો સ્ક્રોલબાર
                    }}
                />
            </div>
        </BaseNode>
    );
};