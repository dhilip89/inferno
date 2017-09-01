/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { createVNode } from "inferno";
import Component from "inferno-component";
import VNodeFlags from "inferno-vnode-flags";
import { warning } from "inferno-shared";
import createHistory from "history/createBrowserHistory";
import Router from "./Router";

export interface IBrowserRouterProps {
  basename: string;
  forceRefresh: boolean;
  getUserConfirmation: () => {};
  keyLength: number;
  children: Array<Component<any, any>>;
}

export default class BrowserRouter extends Component<IBrowserRouterProps, any> {
  public history;

  constructor(props?: any, context?: any) {
    super(props, context);
    this.history = createHistory(props);
  }

  componentWillMount() {
    if (this.props.history) {
      warning(
        "<BrowserRouter> ignores the history prop. To use a custom history, " +
          "use `import { Router }` instead of `import { BrowserRouter as Router }`."
      );
    }
  }

  render() {
    return createVNode(VNodeFlags.ComponentClass, Router, null, null, {
      children: this.props.children,
      history: this.history
    });
  }
}
