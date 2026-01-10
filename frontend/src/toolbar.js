import { DraggableNode } from './draggableNode';
import { nodeOptions } from './nodes/nodeConfig'; // Config માંથી લિસ્ટ લાવો

export const PipelineToolbar = () => {
    return (
        <div className="toolbar-container">
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>

                {/* ડાયનેમિક લૂપ: જેટલા નોડ્સ Config માં હશે, એટલા બટન બની જશે */}
                {nodeOptions.map((node) => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                    />
                ))}

            </div>
        </div>
    );
};