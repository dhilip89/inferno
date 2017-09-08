/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { createVNode, VNode } from "inferno";
//import { createVNode, VNode } from "../../inferno/src/core/VNodes";
import VNodeFlags from "inferno-vnode-flags";
import Route from './Route'
import Link from './Link'

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
export default function(props): VNode {

  const {
    to, exact, strict, location, activeClassName = 'active', className,
    activeStyle, style, isActive: getIsActive, ariaCurrent = 'true', children
  } = props;

  const linkComponent = ({ location, match }) => {
    const isActive = !!(getIsActive ? getIsActive(match, location) : match);
    return createVNode(
      VNodeFlags.ComponentClass,
      Link,
      null,
      children,
      {
        to,
        exact,
        className: isActive
          ? [className, activeClassName].filter(i => i).join(' ')
          : className,
        style: isActive ? { ...style, ...activeStyle } : style,
        'aria-current': isActive && ariaCurrent,
      }
    );
  };

  return createVNode(
    VNodeFlags.ComponentClass,
    Route,
    null,
    null,
    {
      path: typeof to === 'object' ? to.pathname : to,
      exact,
      strict,
      location,
      children: linkComponent,
    }
  );
};
