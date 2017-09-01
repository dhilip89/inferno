/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */
import { createVNode } from "inferno";
import Component from "inferno-component";
import VNodeFlags from "inferno-vnode-flags";
import { warning } from "inferno-shared";
import hoistStatics from "hoist-non-inferno-statics"
import Route from './Route'
import { Ref } from '../../inferno/src/core/VNodes';

interface IRoutedComponent {
  (): any,
  displayName: string,
  WrappedComponent: Component<any, any>
}

interface IWithRouterProps {
  wrappedComponentRef: Ref,
}

interface F {
  (): any;
  someValue: number;
}

var f = <F>function(d) { }
f.someValue = 3


/**
 * A public higher-order component to access the imperative API
 */
function withRouter(Component) {
  const C = <IRoutedComponent>function(props: IWithRouterProps) {

    const { wrappedComponentRef, ...remainingProps } = props;

    return createVNode(VNodeFlags.ComponentClass, Route, null, null, {
      render: function(routeComponentProps) {
        return createVNode(VNodeFlags.ComponentClass, Component, null, null, {
          ...remainingProps,
          ...routeComponentProps,
        }, null, wrappedComponentRef)
      }
    });
    /*
    return (
      <Route render={routeComponentProps; => (
          <Component {...remainingProps}; {...routeComponentProps} ref={wrappedComponentRef}/>;
      )}/>;
    )*/
  };

  C.displayName = `withRouter(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component)
}

export default withRouter
