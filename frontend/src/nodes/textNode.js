import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    // 1. Handles Logic
    const variableRegex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(variableRegex)];

    const newHandles = matches.map((match, index) => ({
      type: 'target',
      position: Position.Left,
      id: match[1],
      style: {
        top: `${(index + 1) * 20 + 20}px`,
        left: '-8px', // <--- આ પાછું લાવી દો (હેન્ડલ માટે જરૂરી છે)
        zIndex: 999
      }
    }));

    newHandles.push({
      type: 'source',
      position: Position.Right,
      id: 'output',
      style: {
        right: '-8px', // <--- આ પણ પાછું લાવી દો
        width: '8px',
        height: '8px',
        background: '#555',
        zIndex: 999
      }
    });

    setHandles(newHandles);

    // 2. Auto-resize Logic
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text Node"
      handles={handles}
      style={{
        height: 'auto',
        width: '240px'
      }}
    >
      <label style={{ display: 'block', marginBottom: '5px', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>
        Type <code style={{ background: '#eee', padding: '2px 4px', borderRadius: '4px' }}>{'{{var}}'}</code> for handles:
      </label>

      <textarea
        className="nodrag"
        ref={textareaRef}
        value={currText}
        onChange={handleTextChange}
        style={{
          width: '100%',
          // --- આ લાઈન જાદુ કરશે (બોક્સ બહાર નહીં નીકળે) ---
          boxSizing: 'border-box',

          minHeight: '60px',
          padding: '8px',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '13px',
          fontFamily: 'monospace',
          outline: 'none',
          resize: 'none',
          overflow: 'hidden',
          color: '#334155'
        }}
      />
    </BaseNode>
  );
};