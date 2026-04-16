/* eslint-disable import/no-unresolved, react/jsx-filename-extension, @typescript-eslint/no-unused-vars, react/prop-types */
import { useState, useEffect, useMemo, useRef } from 'react';

// react-hooks/void-use-memo - useMemo without return value
const VoidUseMemo = () => {
	const [items] = useState([1, 2, 3]);
	useMemo(() => {
		items.sort();
	}, [items]);
	return <div>{items.length}</div>;
};

// react-hooks/globals - mutating external state during render
let externalCounter = 0;
const MutatesGlobal = () => {
	externalCounter += 1;
	return <div>{externalCounter}</div>;
};

// react-hooks/static-components - component defined inside another component
const OuterComponent = () => {
	const InnerComponent = () => <span>inner</span>;
	return <div><InnerComponent /></div>;
};

// react-hooks/refs - reading ref.current during render
const ReadsRefInRender = () => {
	const ref = useRef(0);
	const val = ref.current;
	return <div>{val}</div>;
};

// react-hooks/immutability - mutating props during render
const MutatesProps = ({ data }) => {
	data.count = 5;
	return <div>{data.count}</div>;
};

// react-hooks/set-state-in-render - setState during render
const SetStateInRender = () => {
	const [count, setCount] = useState(0);
	if (count < 1) {
		setCount(1);
	}
	return <div>{count}</div>;
};

// react-hooks/set-state-in-effect - setState synchronously in effect
const SetStateInEffect = () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		setCount(count + 1);
	}, [count]);
	return <div>{count}</div>;
};

export { VoidUseMemo, MutatesGlobal, OuterComponent, ReadsRefInRender, MutatesProps, SetStateInRender, SetStateInEffect };
