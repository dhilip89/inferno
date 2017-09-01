import { warning } from "inferno-shared";

export function childrenOnly(children) {
  children = Array.isArray(children) ? children : [children];
  if (children.length !== 1) {
    throw new Error("Children.only() expects only one child.");
  }
  return children[0];
}

export function childrenCount(children) {
  children = Array.isArray(children) ? children : [children];
  return children.length;
}

export function assert(condition, message) {
  if (!condition) {
    warning(message)
  }
}
