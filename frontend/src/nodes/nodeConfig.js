// બધા નોડ્સ અહીં ઈમ્પોર્ટ કરો
import { InputNode } from './inputNode';
import { LLMNode } from './llmNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';
import { DateNode } from './DateNode';
import { NoteNode } from './NoteNode';
import { TranslationNode } from './TranslationNode';
import { FileSaveNode } from './FileSaveNode';
import { ApiCallNode } from './ApiCallNode';

// એક જ લિસ્ટ બનાવો જેનો ઉપયોગ બધે થશે
export const nodeOptions = [
    { type: 'customInput', label: 'Input', component: InputNode },
    { type: 'llm', label: 'LLM', component: LLMNode },
    { type: 'customOutput', label: 'Output', component: OutputNode },
    { type: 'text', label: 'Text', component: TextNode },
    { type: 'date', label: 'Date', component: DateNode },
    { type: 'note', label: 'Note', component: NoteNode },
    { type: 'translation', label: 'Translator', component: TranslationNode },
    { type: 'fileSave', label: 'File Save', component: FileSaveNode },
    { type: 'apiCall', label: 'API Call', component: ApiCallNode },
];

// ReactFlow માટે nodeTypes ઓબ્જેક્ટ ઓટોમેટિક બનાવો
export const nodeTypes = nodeOptions.reduce((acc, node) => {
    acc[node.type] = node.component;
    return acc;
}, {});