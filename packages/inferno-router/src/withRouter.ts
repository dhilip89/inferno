/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { createVNode } from "inferno";
import Component from "inferno-component";
import VNodeFlags from "inferno-vnode-flags";
import hoistStatics from "hoist-non-inferno-statics";
import Route from "./Route";

interface IRoutedComponent {
  (): any;
  displayName: string;
  WrappedComponent: Component<any, any>;
}

interface IWithRouterProps {
  wrappedComponentRef: any;
}

/**
 * A public higher-order component to access the imperative API
 */
export default function withRouter(InjComponent) {
  const C = <IRoutedComponent>function(props: IWithRouterProps) {
    const { wrappedComponentRef, ...remainingProps } = props;

    return createVNode(VNodeFlags.ComponentClass, Route, null, null, {
      render: function(routeComponentProps) {
        return createVNode(
          VNodeFlags.ComponentUnknown,
          InjComponent,
          null,
          null,
          {
            ...remainingProps,
            ...routeComponentProps
          },
          null,
          wrappedComponentRef
        );
      }
    });
  };

  C.displayName = `withRouter(${InjComponent.displayName || InjComponent.name})`;
  C.WrappedComponent = InjComponent;
  return hoistStatics(C, InjComponent);
}
