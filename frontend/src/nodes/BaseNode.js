// frontend/src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';

// આ એક કોમન ડિઝાઈન છે જે બધા નોડ્સ વાપરશે
export const BaseNode = ({ id, data, title, children, handles = [], style = {} }) => {
    return (
        <div className="custom-node" style={{ ...style }}>
            {/* Header / Title */}
            <div className="node-header">
                {title}
            </div>

            {/* Content */}
            <div className="node-content">
                {children}
            </div>

            {/* Handles + Labels */}
            {handles.map((handle, index) => (
                <div key={index}>
                    <Handle
                        type={handle.type}
                        position={handle.position}
                        id={`${id}-${handle.id}`}
                        style={{
                            ...handle.style,
                            // width: 8, height: 8, background: '#555'
                        }}
                    />

                    {/* Label for Handle */}
                    <span className="handle-label" style={{
                        left: handle.position === Position.Left ? -12 : 'auto',
                        right: handle.position === Position.Right ? -12 : 'auto',
                        top: handle.style?.top || '50%',
                        transform: handle.position === Position.Left ? 'translate(-100%, -50%)' : 'translate(100%, -50%)',
                        display: handle.style?.top ? 'block' : 'none'
                    }}>
                        {handle.id}
                    </span>
                </div>
            ))}
        </div>
    );
};