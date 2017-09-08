/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { cloneVNode, VNode } from "inferno";
import Component from "inferno-component";
import matchPath from "./matchPath";
import { warning, invariant } from "./utils";

export interface ISwitchProps {
  router: any;
  children: Array<Component<any, any>>;
}

/**
 * The public API for rendering the first <Route> that matches.
 */
export default class Switch extends Component<ISwitchProps, any> {
  componentWillMount() {
    invariant(
      this.context.router,
      "You should not use <Switch> outside a <Router>"
    );
  }

  componentWillReceiveProps(nextProps) {
    warning(
      !(nextProps.location && !this.props.location),
      '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    );

    warning(
      !(!nextProps.location && this.props.location),
      '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    );
  }

  render(): VNode | null {
    const { route } = this.context.router;
    const location = this.props.location || route.location;
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];

    let match, child;
    children.forEach(element => {
      //if (!React.isValidElement(element)) return

      const { path: pathProp, exact, strict, sensitive, from } = element.props;
      const path = pathProp || from;

      if (match == null) {
        child = element;
        match = path
          ? matchPath(location.pathname, { path, exact, strict, sensitive })
          : route.match;
      }
    });

    // console.info("--Switch.render");
    return match ? cloneVNode(child, { location, computedMatch: match }) : null;
    //return match ? cloneVNode(child) : null;
  }
}
