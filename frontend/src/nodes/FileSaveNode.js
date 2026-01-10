import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const FileSaveNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            title="Save to File"
            handles={[
                { type: 'target', position: Position.Left, id: 'data-in' }
            ]}
        >
            <div style={{ padding: '5px', textAlign: 'center', color: '#555' }}>
                Data received will be saved as .json
            </div>
        </BaseNode>
    );
};