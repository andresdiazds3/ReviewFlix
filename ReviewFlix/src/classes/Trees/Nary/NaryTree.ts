import { NaryNode } from './NaryNode';

type NaryTreeProps = {
    root: NaryNode;
};

export class NaryTree {
    root: NaryNode;

    constructor({ root }: NaryTreeProps) {
        this.root = root;
    }

    findById(id: string, current: NaryNode = this.root): NaryNode | null {
        if (current.id === id) {
            return current;
        }

        for (const child of current.children) {
            const found = this.findById(id, child);
            if (found) {
                return found;
            }
        }

        return null;
    }

    addChild(parentId: string, child: NaryNode): boolean {
        const parent = this.findById(parentId);
        if (!parent) {
            return false;
        }

        parent.addChild(child);
        return true;
    }
}