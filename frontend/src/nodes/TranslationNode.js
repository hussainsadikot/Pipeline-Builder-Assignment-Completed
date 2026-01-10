import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TranslationNode = ({ id, data }) => {
    const [lang, setLang] = useState('es');

    return (
        <BaseNode
            id={id}
            data={data}
            title="Translator"
            handles={[
                { type: 'target', position: Position.Left, id: 'input-text' },
                { type: 'source', position: Position.Right, id: 'translated-text' }
            ]}
        >
            <label className="nodrag">
                Language:
                <select className="nodrag" value={lang} onChange={(e) => setLang(e.target.value)} style={{ width: '100%' }}>
                    <option className="nodrag" value="es">Spanish</option>
                    <option className="nodrag" value="fr">French</option>
                    <option className="nodrag" value="de">German</option>
                    <option className="nodrag" value="hi">Gujarati</option>
                </select>
            </label>
        </BaseNode>
    );
};