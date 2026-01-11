import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } }, // ડાબી બાજુ ઉપર
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } }, // ડાબી બાજુ નીચે
        { type: 'source', position: Position.Right, id: 'response' } // જમણી બાજુ આઉટપુટ
      ]}
    >
      <div style={{ fontSize: '14px' }}>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
