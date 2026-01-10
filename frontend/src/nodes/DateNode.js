import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const DateNode = ({ id, data }) => {
    const [date, setDate] = useState(data?.date || '');

    return (
        <BaseNode
            id={id}
            data={data}
            title="Date Selector"
            handles={[
                { type: 'source', position: Position.Right, id: 'date-out' }
            ]}
        >
            <label
                className="nodrag">
                Select Date:
                <input
                    className="nodrag"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: '100%', marginTop: '5px' }}
                />
            </label>
        </BaseNode>
    );
};