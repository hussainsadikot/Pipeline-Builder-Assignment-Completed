import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const ApiCallNode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || 'https://api.example.com');

    return (
        <BaseNode
            id={id}
            data={data}
            title="API Call"
            handles={[
                { type: 'target', position: Position.Left, id: 'trigger' },
                { type: 'source', position: Position.Right, id: 'response' }
            ]}
        >
            <label>
                API URL:
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ width: '100%' }}
                />
            </label>
        </BaseNode>
    );
};