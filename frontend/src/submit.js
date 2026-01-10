import { useStore } from './store';
// import { shallow } from 'zustand/shallow'; // આ લાઈન કાઢી નાખી, આની જરૂર નથી

export const SubmitButton = () => {
    // સાદી રીતે ડેટા લાવો (આમાં કોઈ એરર નહીં આવે)
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        // Checkpoint 1: બટન દબાવતા જ આ મેસેજ આવવો જોઈએ
        alert("Button clicked! Sending data to backend...");

        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();

            // Result Alert
            alert(`Success!\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nDAG: ${data.is_dag}`);

        } catch (error) {
            console.error(error);
            alert("Error: Backend સાથે કનેક્ટ નથી થઈ શકતું. કૃપા કરીને જુઓ કે uvicorn ચાલુ છે કે નહીં.");
        }
    };

    return (
        <div className="submit-container">
            <button
                type="submit"
                onClick={handleSubmit}
                className="submit-button"
            >
                Submit Pipeline
            </button>
        </div>
    );
}