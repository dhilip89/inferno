import { render } from "inferno";
import { innerHTML } from "inferno-utils";
import { BrowserRouter } from "inferno-router";

describe.skip("BrowserRouter (jsx)", () => {
  let container;

  beforeEach(function() {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(function() {
    render(null, container);
    document.body.removeChild(container);
  });

  it('puts history on context.router', () => {
    let history
    const ContextChecker = (props, context) => {
      history = context.router.history
      return null
    }

    render((
      <BrowserRouter>
        <ContextChecker/>
      </BrowserRouter>
    ), container);

    expect(typeof history).toBe('object')
  })

  it('warns when passed a history prop', () => {
    const history = {}

    spyOn(console, 'warn')

    render((
      <BrowserRouter history={history}/>
    ), container)

    expect(console.warn).toHaveBeenCalledTimes(1)

    // browser only?
    expect(console.warn.calls.mostRecent().args[0]).toContain('<BrowserRouter> ignores the history prop')

    // node only?
    //expect(console.warn).toHaveBeenCalledWith(
    //  expect.stringContaining('<BrowserRouter> ignores the history prop')
    //)
  })
});
