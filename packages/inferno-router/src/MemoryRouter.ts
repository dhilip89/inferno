/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { createVNode, VNode } from "inferno";
import Component from "inferno-component";
import VNodeFlags from "inferno-vnode-flags";
import createHistory from "history/createMemoryHistory";
import Router from "./Router";
import { warning } from "./utils";

export interface IMemoryRouterProps {
  initialEntries: Array<string>;
  initialIndex: number;
  getUserConfirmation: () => {};
  keyLength: number;
  children: Array<Component<any, any>>;
}

export default class MemoryRouter extends Component<IMemoryRouterProps, any> {
  public history;

  constructor(props?: any, context?: any) {
    super(props, context);
    this.history = createHistory(props);
  }

  componentWillMount() {
    warning(
      !this.props.history,
      "<MemoryRouter> ignores the history prop. To use a custom history, " +
        "use `import { Router }` instead of `import { MemoryRouter as Router }`."
    );
  }

  render(): VNode {
    // console.info("--MemoryRouter.render");
    return createVNode(VNodeFlags.ComponentClass, Router, null, null, {
      children: this.props.children,
      history: this.history
    });
  }
}
