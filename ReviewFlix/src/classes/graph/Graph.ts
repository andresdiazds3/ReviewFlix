import { Node } from "./GraphNode";

type Props = {
    nodes: Node[]
    adjlist: {
        [key:string]: Node[]
    }
}

export class Graph {
    nodes: Node[];
    adjlist: {
        [key:string]: Node[]
    }

    constructor({nodes, adjlist}: Props){
        this.nodes = nodes;
        this.adjlist = adjlist;
    }

    addNode(newNode: Node){
        if (this.nodes.some(node => node.id === newNode.id)) {
            throw new Error("Ya hay  un nodo con el mismo id en el grafo");
        }

        this.nodes.push(newNode);

        if (newNode.tipo === "city") {
            this.adjlist[newNode.id] = [];
            return;
        }

        if (!newNode.ciudadId) {
            throw new Error("El nodo persona debe tener una ciudadId");
        }

        if (!this.adjlist[newNode.ciudadId]) {
            throw new Error("La ciudad referenciada no existe en el grafo");
        }

        this.adjlist[newNode.ciudadId].push(newNode);
    }

    addEdge(cityNode: Node, personNode: Node){
        if (cityNode.tipo !== "city") {
            throw new Error("node1 debe ser una ciudad");
        }

        if (personNode.tipo !== "person") {
            throw new Error("node2 debe ser una persona");
        }

        if (!this.adjlist[cityNode.id]) {
            this.adjlist[cityNode.id] = [];
        }

        Object.keys(this.adjlist).forEach((cityId) => {
            this.adjlist[cityId] = this.adjlist[cityId].filter(node => node.id !== personNode.id);
        });

        personNode.ciudadId = cityNode.id;

        if (this.adjlist[cityNode.id].some(node => node.id === personNode.id)) {
            return;
        }

        this.adjlist[cityNode.id].push(personNode);
    }

    searchNode(node:Node){
        if(!this.nodes.length) return;
        return this.nodes.find(n => n.id === node.id)
    }

    printAdjacency(node:Node){
        if (!this.searchNode(node)) {
            return;
        }

        if (node.tipo !== "city") {
            console.log("Solo las ciudades tienen lista de adyacencia");
            return;
        }

        console.log(this.adjlist[node.id] ?? [])
    }

    getPeopleByCity(cityName: string){
        const cityNode = this.nodes.find(
            node => node.tipo === "city" && node.nombre === cityName
        );

        if (!cityNode) {
            return [];
        }

        return this.adjlist[cityNode.id] ?? [];
    }

    getPeopleByCityId(cityId: string){
        return this.adjlist[cityId] ?? [];
    }

    getCities(){
        return this.nodes.filter(node => node.tipo === "city");
    }

    getPeople(){
        return this.nodes.filter(node => node.tipo === "person");
    }

    getNodeById(id: string){
        return this.nodes.find(node => node.id === id);
    }

    printGraph(){
        console.log(this.adjlist)
    }
}