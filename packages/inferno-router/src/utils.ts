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

export function warning(condition, message) {
  if (!condition) {
    console.warn(message);
  }
}

export function invariant(condition, format, a?, b?, c?, d?, e?, f?) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}
