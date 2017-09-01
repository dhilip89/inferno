/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { createVNode } from "inferno";
import Component from "inferno-component";
import { warning } from "inferno-shared";
import { createLocation, locationsAreEqual } from 'history'
import { invariant } from "./utils";

export default class Redirect extends Component<any, any> {

  state = {
    location: null
  };

  isStatic() {
    return this.context.router && this.context.router.staticContext
  }

  componentWillMount() {
    invariant(
      this.context.router,
      'You should not use <Redirect> outside a <Router>'
    );

    if (this.isStatic())
      this.perform()
  }

  componentDidMount() {
    if (!this.isStatic())
      this.perform()
  }

  componentDidUpdate(prevProps) {
    const prevTo = createLocation(prevProps.to);
    const nextTo = createLocation(this.props.to);

    if (locationsAreEqual(prevTo, nextTo)) {
      warning(`You tried to redirect to the same route you're currently on: "${nextTo.pathname}${nextTo.search}"`);
      return
    }

    this.perform()
  }

  perform() {
    const { history } = this.context.router;
    const { push = false, to } = this.props;

    if (push) {
      history.push(to)
    } else {
      history.replace(to)
    }
  }

  render() {
    return null
  }
}
