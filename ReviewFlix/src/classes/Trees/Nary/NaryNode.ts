import type { Review } from "../../../types/Review";

export type NaryNodeProps = {
  id: string;
  title: string;
  link: string;
  children?: NaryNode[];
  data?: Review;
};

export class NaryNode {
  id: string;
  title: string;
  link: string;
  children: NaryNode[];
  data?: Review;

  constructor({ id, title, link, children = [], data }: NaryNodeProps) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.children = children;
    this.data = data;
  }

  addChild(child: NaryNode) {
    this.children.push(child);
  }

  hasChildren() {
    return this.children.length > 0;
  }
}