import isValidElement from "../../inferno-compat/src/isValidElement";

export function childrenOnly(children) {
  invariant(
    isValidElement(children),
    "React.Children.only expected to receive a single React element child."
  );
  return children;
}

export function childrenCount(children) {
  if (children == null) {
    return 0;
  }
  return Array.isArray(children) ? children.length : 1;
}

export function warning(condition, message) {
  if (!condition) {
    console.warn(message);
  }
}

export function invariant(condition, format, a?, b?, c?, d?, e?, f?) {
  if (process.env.NODE_ENV !== "production") {
    if (format === undefined) {
      throw new Error("invariant requires an error message argument");
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        "Minified exception occurred; use the non-minified dev environment " +
          "for the full error message and additional helpful warnings."
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() {
          return args[argIndex++];
        })
      );
      error.name = "Invariant Violation";
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}
