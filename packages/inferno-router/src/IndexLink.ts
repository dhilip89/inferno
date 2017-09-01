/**
 * @module Inferno-Router
 */ /** TypeDoc Comment */

import { createVNode } from "inferno";
import VNodeFlags from "inferno-vnode-flags";
import Link from "./Link";

export default function IndexLink(props) {
  props.to = "/";
  return createVNode(VNodeFlags.ComponentClass, Link, null, null, props);
}
