export type NaryNodeProps = {
  id: string;
  title: string;
  link: string;
  children?: NaryNode[];
};

export class NaryNode {
  id: string;
  title: string;
  link: string;
  children: NaryNode[];

  constructor({ id, title, link, children = [] }: NaryNodeProps) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.children = children;
  }

  addChild(child: NaryNode) {
    this.children.push(child);
  }

  hasChildren() {
    return this.children.length > 0;
  }
}