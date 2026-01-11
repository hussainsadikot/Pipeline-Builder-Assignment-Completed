import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input Node"
      handles={[
        { type: 'source', position: Position.Right, id: 'value' } // જમણી બાજુનું કનેક્શન
      ]}
    >
      <label className="nodrag" style={{ display: 'block', marginBottom: '5px' }}>
        Name:
        <input
          className="nodrag"
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{ width: '100%', padding: '4px', marginTop: '2px' }}
        />
      </label>
      <label className="nodrag" style={{ display: 'block' }}>
        Type:
        <select
          className="nodrag"
          value={inputType}
          onChange={handleTypeChange}
          style={{ width: '100%', padding: '4px', marginTop: '2px' }}
        >
          <option className="nodrag" value="Text">Text</option>
          <option className="nodrag" value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}

