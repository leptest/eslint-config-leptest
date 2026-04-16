// React component examples demonstrating JSX, a11y, and hooks rules
// eslint-disable-next-line import/no-unresolved
import React, { useState, useEffect, useCallback, memo } from 'react';

// Arrow function component (named), destructuring props, hooks
const SearchForm = ({ onSubmit, placeholder }) => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (query.length > 2) {
			setResults([`Result for: ${query}`]);
		}
	}, [query]);

	const handleChange = useCallback((e) => {
		setQuery(e.target.value);
	}, []);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		onSubmit(query);
	}, [onSubmit, query]);

	// jsx-a11y/label-has-associated-control (assert: both = nesting + htmlFor)
	// button-has-type, anchor-is-valid, alt-text, aria attributes
	return (
		<div role="search" aria-label="Site search">
			<form onSubmit={handleSubmit}>
				<label htmlFor="search-input">
					Search
					<input
						id="search-input"
						type="text"
						value={query}
						onChange={handleChange}
						placeholder={placeholder}
						aria-describedby="search-help"
					/>
				</label>
				<span id="search-help">Enter at least 3 characters</span>
				<button type="submit">Search</button>
				<button type="button" onClick={() => setQuery('')}>Clear</button>
			</form>
			<img src="/logo.png" alt="Company logo" />
			<a href="https://example.com">Visit our site</a>
			<ul>
				{results.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
};

// React.memo usage with arrow function
const StatusBadge = memo(({ status, count }) => {
	const label = status === 'active' ? 'Active' : 'Inactive';
	return (
		<span
			role="status"
			aria-live="polite"
			className={`badge-${status}`}
		>
			{label}: {count}
		</span>
	);
});

StatusBadge.displayName = 'StatusBadge';

// Component with keyboard equivalents for click events
// jsx-a11y/click-events-have-key-events, no-static-element-interactions
const TogglePanel = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const handleKeyDown = useCallback((e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			setIsOpen((prev) => !prev);
		}
	}, []);

	return (
		<div>
			<div
				role="button"
				tabIndex={0}
				onClick={handleToggle}
				onKeyDown={handleKeyDown}
				aria-expanded={isOpen}
			>
				<h2>{title}</h2>
			</div>
			{isOpen && <div>{children}</div>}
		</div>
	);
};

// Component demonstrating proper fragment usage (no useless fragments)
const UserProfile = ({ name, email, bio }) => (
	<>
		<h1>{name}</h1>
		<p>{email}</p>
		<p>{bio}</p>
	</>
);

// Component with self-closing tags, jsx-curly-brace-presence
const MediaCard = ({ src, title, description }) => (
	<article aria-labelledby="media-title">
		<img src={src} alt={title} />
		<div>
			<h3 id="media-title">{title}</h3>
			<p>{description}</p>
		</div>
		<hr />
		<br />
	</article>
);

// List component with key props, no array index as key
const TaskList = ({ tasks }) => (
	<ul>
		{tasks.map((task) => (
			<li key={task.id} aria-label={task.name}>
				<StatusBadge status={task.done ? 'active' : 'inactive'} count={1} />
				<span>{task.name}</span>
			</li>
		))}
	</ul>
);

// Component using mouse events with keyboard equivalents
const HoverCard = ({ label, detail }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			role="button"
			tabIndex={0}
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
			onClick={() => setIsHovered((prev) => !prev)}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					setIsHovered((prev) => !prev);
				}
			}}
		>
			<strong>{label}</strong>
			{isHovered && <p>{detail}</p>}
		</div>
	);
};

// Main App component composing everything
const App = () => {
	const handleSearch = useCallback((q) => {
		const encoded = encodeURIComponent(q);
		return encoded;
	}, []);

	const tasks = [
		{ id: 'task-1', name: 'Write tests', done: false },
		{ id: 'task-2', name: 'Review PR', done: true },
		{ id: 'task-3', name: 'Deploy', done: false },
	];

	return (
		<main>
			<SearchForm onSubmit={handleSearch} placeholder="Search..." />
			<TogglePanel title="Details">
				<UserProfile name="Jane" email="jane@example.com" bio="Developer" />
			</TogglePanel>
			<MediaCard
				src="/photo.jpg"
				title="Featured"
				description="A featured media card"
			/>
			<TaskList tasks={tasks} />
			<HoverCard label="Hover me" detail="Extra information" />
		</main>
	);
};

export default App;
