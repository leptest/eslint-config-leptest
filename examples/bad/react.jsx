/* eslint-disable strict */
import React, { useState, useEffect } from "react"; // violates: quotes

// violates: react/function-component-definition (should be arrow function)
function BadComponent(props) {
  var count = 0; // violates: no-var

  if (count === 0) {
    const [state, setState] = useState(0); // violates: react-hooks/rules-of-hooks (hook in conditional)
  }

  const [value, setValue] = useState(0);

  useEffect(() => { // violates: react-hooks/exhaustive-deps (missing 'value' dependency)
    console.log(value); // violates: no-console
  }, []);

  const items = ["a", "b", "c"]; // violates: quotes

  return (
    <div>
      {/* violates: jsx-a11y/alt-text (missing alt) */}
      <img src="photo.jpg" /> {/* violates: jsx-a11y/alt-text */}

      {/* violates: jsx-a11y/img-redundant-alt ("image" in alt text) */}
      <img src="pic.jpg" alt="image of a cat" /> {/* violates: jsx-a11y/img-redundant-alt */}

      {/* violates: jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div onClick={() => {}} role="button"> {/* violates: jsx-a11y/click-events-have-key-events */}
        Click me
      </div>

      {/* violates: jsx-a11y/anchor-is-valid */}
      <a href="#">Bad link</a> {/* violates: jsx-a11y/anchor-is-valid */}

      {/* violates: react/jsx-props-no-spreading */}
      <div {...props} /> {/* violates: react/jsx-props-no-spreading */}

      {/* violates: react/button-has-type */}
      <button>No type</button> {/* violates: react/button-has-type */}

      {/* violates: react/jsx-no-useless-fragment */}
      <>{value}</> {/* violates: react/jsx-no-useless-fragment */}

      {/* violates: react/no-array-index-key */}
      {items.map((item, index) => (
        <span key={index}>{item}</span> /* violates: react/no-array-index-key */
      ))}

      {/* violates: react/no-string-refs */}
      <div ref="myRef">String ref</div> {/* violates: react/no-string-refs */}

      {/* violates: react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: "<b>danger</b>" }} /> {/* violates: react/no-danger */}

      {/* violates: jsx-a11y/no-autofocus */}
      <input autoFocus /> {/* violates: jsx-a11y/no-autofocus */}

      {/* violates: jsx-a11y/tabindex-no-positive */}
      <div tabIndex="5">Positive tabindex</div> {/* violates: jsx-a11y/tabindex-no-positive */}

      {/* violates: jsx-a11y/iframe-has-title */}
      <iframe src="https://example.com" /> {/* violates: jsx-a11y/iframe-has-title */}

      {/* violates: jsx-a11y/heading-has-content */}
      <h1 /> {/* violates: jsx-a11y/heading-has-content */}

      {/* violates: jsx-a11y/label-has-associated-control */}
      <label>No input associated</label> {/* violates: jsx-a11y/label-has-associated-control */}

      {/* violates: jsx-a11y/no-distracting-elements */}
      <marquee>Scrolling text</marquee> {/* violates: jsx-a11y/no-distracting-elements */}

      {/* violates: jsx-a11y/no-access-key */}
      <div accessKey="h">Access key</div> {/* violates: jsx-a11y/no-access-key */}

      {/* violates: react/jsx-no-target-blank */}
      <a href="https://example.com" target="_blank">Unsafe link</a> {/* violates: react/jsx-no-target-blank */}
    </div>
  );
}

// --- New rules (ESLint 9 + updated plugins) ---

// react/display-name - anonymous component without displayName
const AnonymousComponent = React.memo((props) => (
  <div>{props.label}</div>
));

// react/jsx-key - missing key in .map()
const MissingKeys = () => (
  <ul>
    {["a", "b", "c"].map((item) => (
      <li>{item}</li>
    ))}
  </ul>
);

// react/no-direct-mutation-state
class MutatesState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  handleClick() {
    this.state.count = 5; // violates: react/no-direct-mutation-state
  }
  render() {
    return <button type="button" onClick={() => this.handleClick()}>{this.state.count}</button>;
  }
}

// jsx-a11y/autocomplete-valid - invalid autocomplete value for input type
const BadAutocomplete = () => (
  <form>
    <label htmlFor="ac-email">
      Email
      <input id="ac-email" type="email" autoComplete="postal-code" />
    </label>
  </form>
);

export { AnonymousComponent, MissingKeys, MutatesState, BadAutocomplete };
export default BadComponent;