// frontend/src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';
import React from 'react';

export const BaseNode = ({ id, data, title, children, handles = [], style = {}, className }) => {
    return (
        <div className={`custom-node ${className || ''}`}
            style={{
                ...style,
                position: 'relative',
                boxSizing: 'border-box',
                overflow: 'visible' // હેન્ડલ અને લેબલ બહાર દેખાય તે માટે
            }}>

            {/* Header */}
            <div className="node-header">
                {title}
            </div>

            {/* Content Area */}
            <div className="node-content">
                {children}
            </div>

            {/* Handles Rendering */}
            {handles.map((handle, index) => (
                <React.Fragment key={index}>
                    <Handle
                        type={handle.type}
                        position={handle.position}
                        id={handle.id}
                        style={{
                            ...handle.style,
                            zIndex: 10,
                            background: '#555',
                            width: '10px',
                            height: '10px',
                            border: '2px solid white',
                            borderRadius: '50%'
                        }}
                    />

                    {/* ALIAS (Label) RENDERING - Corrected Logic */}
                    {/* {handle.label && (
                        <div style={{
                            position: 'absolute',
                            // ફોર્મ્યુલા: હેન્ડલ જ્યાં હોય, તેનાથી 20px ઉપર
                            top: `calc(${handle.style.top} - 20px)`,

                            // ડાબી બાજુનું સેટિંગ
                            left: handle.position === Position.Left ? '-10px' : 'auto',
                            right: handle.position === Position.Right ? '-10px' : 'auto',

                            fontSize: '11px',
                            color: '#64748b',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap'
                        }}>
                            {handle.label}
                        </div>
                    )} */}
                    {/* ALIAS RENDERING: Bullet Point Style */}
                    {handle.label && (
                        <div style={{
                            position: 'absolute',

                            // 1. Vertical Alignment: હેન્ડલની સાથે સેન્ટરમાં
                            top: handle.style.top,
                            transform: 'translateY(-50%)',

                            // 2. Horizontal Alignment: હેન્ડલની જમણી બાજુ (Inside Node)
                            left: handle.position === Position.Left ? '15px' : 'auto',
                            right: handle.position === Position.Right ? '15px' : 'auto',

                            fontSize: '13px', // ફોન્ટ થોડા મોટા કર્યા જેથી લિસ્ટ જેવું લાગે
                            color: '#334155', // Slate-700 (Darker color)
                            fontFamily: 'sans-serif', // લિસ્ટ માટે સાદો ફોન્ટ સારો લાગે
                            fontWeight: '500',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                            zIndex: 20
                        }}>
                            {handle.label}
                        </div>
                    )}

                </React.Fragment>
            ))}
        </div>
    );
};