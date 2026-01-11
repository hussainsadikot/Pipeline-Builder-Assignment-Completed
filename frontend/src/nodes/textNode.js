// frontend/src/nodes/textNode.js
import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { Position, useUpdateNodeInternals } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const [nodeHeight, setNodeHeight] = useState('auto');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // --- SETTINGS FOR SPREAD ---
  const fixedWidth = 320; // પહોળાઈ થોડી વધારી જેથી લિસ્ટ સમાઈ જાય

  // આ લાઈન હાઈટ વધારી છે જેથી લિસ્ટ ખુલ્લું (Spread) દેખાય
  const rowHeight = 32;

  const headerOffset = 65;

  useEffect(() => {
    const variableRegex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(variableRegex)];

    const newHandles = matches.map((match, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${match[1]}-${index}`,
      label: match[1], // સાદું નામ મોકલો
      style: {
        // Vertical Spread Logic
        top: `${headerOffset + (index * rowHeight)}px`,

        // Handle Position: બોર્ડર પર જ રાખો (વધારે બહાર નહીં)
        left: '-5px',
      }
    }));

    // Output Handle
    newHandles.push({
      type: 'source',
      position: Position.Right,
      id: 'output',
      style: { top: '50%', right: '-5px', transform: 'translateY(-50%)' }
    });

    setHandles(newHandles);
    setTimeout(() => updateNodeInternals(id), 0);

    // Height Calculation
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const contentHeight = textareaRef.current.scrollHeight;

      // હેન્ડલ લિસ્ટ માટે જગ્યાની ગણતરી
      const handlesHeight = headerOffset + (matches.length * rowHeight) + 30;

      // ટેક્સ્ટ અથવા લિસ્ટ, જે મોટું હોય તેટલી હાઈટ
      const finalHeight = Math.max(contentHeight + 95, handlesHeight, 180);

      setNodeHeight(finalHeight);
      textareaRef.current.style.height = `${contentHeight}px`;
    }

  }, [currText, id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };
  // Check if we have input handles (more than just the output handle)
  const hasInputs = handles.length > 1;
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text Node"
      handles={handles}
      style={{
        width: `${fixedWidth}px`,
        height: `${nodeHeight}px`,
        transition: 'height 0.1s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <label style={{ display: 'block', marginBottom: '10px', color: '#64748b', fontSize: '11px', fontWeight: '500' }}>
        Variables:
      </label>

      <div style={{ flexGrow: 1, height: '100%', paddingBottom: '10px' }}>
        <textarea
          className="nodrag"
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            // width: '100%',
            // 1. જો વેરીએબલ હોય તો 75px ખસી જાઓ, નહીંતર 0
            marginLeft: hasInputs ? '75px' : '0px',

            // 2. પહોળાઈ એડજસ્ટ કરો: (કુલ - માર્જિન)
            width: hasInputs ? 'calc(100% - 75px)' : '100%',

            // 3. પેડિંગ હવે નોર્મલ કરી દીધું
            padding: '5px 8px',
            height: '100%',
            boxSizing: 'border-box',
            // paddingLeft: handles.length > 1 ? '75px' : '10px',

            // Textarea ને થોડું ટ્રાન્સપરન્ટ રાખ્યું જેથી પાછળનું લિસ્ટ (જો હોય તો) નડે નહીં
            background: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',

            resize: 'none',
            overflow: 'hidden',
            fontFamily: "'Fira Code', monospace",
            fontSize: '14px',

            // લાઈન હાઈટ મેચ કરી (ઓપ્શનલ, જો તમારે ટેક્સ્ટ અને હેન્ડલ મેચ કરવા હોય તો)
            lineHeight: `${rowHeight}px`,

            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}
        />
      </div>
    </BaseNode>
  );
};