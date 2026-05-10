export type NodeValue = number;

type NodeProps = {
    valor: number;
    izquierda?: TreeNode | null;
    derecha?: TreeNode | null;
};

export class TreeNode {
    valor: number;
    izquierda: TreeNode | null;
    derecha: TreeNode | null;

    constructor({ valor, izquierda = null, derecha = null }: NodeProps) {
        this.valor = valor;
        this.izquierda = izquierda;
        this.derecha = derecha;
    }

    isLeaf(){
        if (this.izquierda === null && this.derecha === null){
            return true;
        } else {
            return false;
        }
    }
}