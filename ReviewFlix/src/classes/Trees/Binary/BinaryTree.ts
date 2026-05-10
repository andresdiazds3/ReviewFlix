import { TreeNode, type NodeValue } from "./TreeNode";

type Props = {
    raiz?: TreeNode | null;
};

export class ArbolBinario {
    raiz: TreeNode | null;

    constructor({ raiz = null }: Props = {}) {
        this.raiz = raiz;
    }

    insertar(valor: NodeValue) {
        const nuevoNodo = new TreeNode({ valor });
        if (!this.raiz) {
            this.raiz = nuevoNodo;
            return nuevoNodo;
        }

        let actual = this.raiz;
        while (true) {
            if (valor < actual.valor) {
                if (!actual.izquierda) {
                    actual.izquierda = nuevoNodo;
                    return nuevoNodo;
                }
                actual = actual.izquierda;
            } else {
                if (!actual.derecha) {
                    actual.derecha = nuevoNodo;
                    return nuevoNodo;
                }
                actual = actual.derecha;
            }
        }
    }


    preorden(node: TreeNode | null = this.raiz, resultado: NodeValue[] = []): NodeValue[] {
        if (!node) return resultado;
        resultado.push(node.valor);
        this.preorden(node.izquierda, resultado);
        this.preorden(node.derecha, resultado);
        return resultado;
    }

    inorder(node: TreeNode | null = this.raiz, resultado: NodeValue[] = []): NodeValue[] {
        if (!node) return resultado;
        this.inorder(node.izquierda, resultado);
        resultado.push(node.valor);
        this.inorder(node.derecha, resultado);
        return resultado;
    }

    postorder(node: TreeNode | null = this.raiz, resultado: NodeValue[] = []): NodeValue[] {
        if (!node) return resultado;
        this.postorder(node.izquierda, resultado);
        this.postorder(node.derecha, resultado);
        resultado.push(node.valor);
        return resultado;
    }
}