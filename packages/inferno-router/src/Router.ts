/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { cloneVNode } from "inferno";
import VNodeFlags from "inferno-vnode-flags";
import Component from "inferno-component";
import { childrenOnly, childrenCount, warning, invariant } from "./utils";

export interface IRouterProps {
  history: {
    listen: (callback: any) => {},
    location: {
      pathname: string
    }
  },
  children: Array<Component<any, any>>
}

/**
 * The public API for putting history on context.
 */
class Router extends Component<IRouterProps, any> {

  public unlisten;
  /*public static contextTypes = {
    router: () => {}
  };

  public static childContextTypes = {
    router: () => {}
  };*/

  constructor(props?: any, context?: any) {
    super(props, context);
    this.state = {
      match: this.computeMatch(props.history.location.pathname)
    };
  }

  getChildContext() {
    return {
      router: {
        ...this.context.router,
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      }
    }
  }

  computeMatch(pathname) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/'
    }
  }

  componentWillMount() {
    const { children, history } = this.props;

    invariant(
      children == null || childrenCount(children) === 1,
      'A <Router> may have only one child element'
    );

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(() => {

      console.warn(history.location.pathname)
      this.setState({
        match: this.computeMatch(history.location.pathname)
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    warning(
      this.props.history === nextProps.history,
      'You cannot change <Router history>'
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children } = this.props;

    // below fixes SwitchMount tests but breaks Switch
    return children ? childrenOnly(children) : null;

    // below fixes Switch tests but breaks SwitchMount
    //return cloneVNode(children ? childrenOnly(children) : null);
  }
}

export default Router
