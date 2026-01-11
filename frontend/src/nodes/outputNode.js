import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output Node"
      handles={[
        { type: 'target', position: Position.Left, id: 'value' } // ડેટા આવે છે (Left)
      ]}
    >
      <label className="nodrag" style={{ display: 'block', marginBottom: '5px' }}>
        Name:
        <input
          className="nodrag"
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{ width: '100%', padding: '4px' }}
        />
      </label>
      <label className="nodrag" style={{ display: 'block' }}>
        Type:
        <select
          className="nodrag"
          value={outputType}
          onChange={handleTypeChange}
          style={{ width: '100%', padding: '4px' }}
        >
          <option className="nodrag" value="Text">Text</option>
          <option className="nodrag" value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}
