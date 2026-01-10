from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# ફ્રન્ટએન્ડ સાથે કનેક્ટ કરવા માટે આ ખૂબ જરૂરી છે
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ડેટા જેવો આવશે તેનું ફોર્મેટ (Schema)
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'message': 'Backend is running successfully!'}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # ગ્રાફ બનાવો
    adj_list = {node['id']: [] for node in pipeline.nodes}
    for edge in pipeline.edges:
        if edge['source'] in adj_list:
            adj_list[edge['source']].append(edge['target'])

    # સાયકલ (Loop) ચેક કરો (DAG Logic)
    visited = set()
    recursion_stack = set()
    is_dag = True

    def has_cycle(node_id):
        visited.add(node_id)
        recursion_stack.add(node_id)
        for neighbor in adj_list.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor): return True
            elif neighbor in recursion_stack:
                return True
        recursion_stack.remove(node_id)
        return False

    for node in pipeline.nodes:
        if node['id'] not in visited:
            if has_cycle(node['id']):
                is_dag = False
                break

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}