/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { cloneVNode, VNode } from "inferno";
import Component from "inferno-component";
import matchPath from "./matchPath";
import { assert } from "./utils";

export interface ISwitchProps {
  router: any;
  children: Array<Component<any, any>>;
}

/**
 * The public API for rendering the first <Route> that matches.
 */
export default class Switch extends Component<ISwitchProps, any> {
  /*static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired
    }).isRequired
  };*/

  componentWillMount() {
    assert(
      this.context.router,
      "You should not use <Switch> outside a <Router>"
    );
  }

  componentWillReceiveProps(nextProps) {
    assert(
      !(nextProps.location && !this.props.location),
      '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    );

    assert(
      !(!nextProps.location && this.props.location),
      '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    );
  }

  render() {
    const { route } = this.context.router;
    const { children } = this.props;
    const location = this.props.location || route.location;

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

    console.info("Switch.render");

    return match
      ? cloneVNode(child, {
          location,
          computedMatch: match
        }) as VNode
      : null;
    //return match ? cloneElement(child, { location, computedMatch: match }) : null
  }
}
