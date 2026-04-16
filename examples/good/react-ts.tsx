// =============================================================================
// GOOD TypeScript + React code - passes all rules
// =============================================================================
/* eslint-disable import/no-unresolved, react/jsx-filename-extension */
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

// --- Typed props interfaces (consistent-type-definitions: interface) ---
interface ButtonProps {
	label: string;
	onClick: () => void;
	disabled: boolean;
	variant: 'primary' | 'secondary';
}

interface InputFieldProps {
	id: string;
	name: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	type: 'text' | 'email' | 'password';
}

interface ListItem {
	id: string;
	title: string;
	description: string;
	completed: boolean;
}

interface TaskListProps {
	items: ListItem[];
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}

// --- Generic component props ---
interface SelectOption<T> {
	value: T;
	label: string;
}

interface SelectProps<T> {
	id: string;
	options: SelectOption<T>[];
	selected: T;
	onChange: (value: T) => void;
	ariaLabel: string;
}

// --- Typed event handlers ---
type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
type KeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => void;

// --- Arrow function components (react/function-component-definition) ---

// Simple button with typed props and accessibility
const AccessibleButton = ({ label, onClick, disabled, variant }: ButtonProps): React.ReactElement => {
	const handleKeyDown: KeyDownHandler = useCallback((e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onClick();
		}
	}, [onClick]);

	return (
		<button
			type="button"
			className={`btn btn-${variant}`}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			disabled={disabled}
			aria-disabled={disabled}
		>
			{label}
		</button>
	);
};

// Input field with typed hooks (useRef<T>, useCallback)
const InputField = ({
	id,
	name,
	value,
	onChange,
	placeholder,
	type,
}: InputFieldProps): React.ReactElement => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange: InputChangeHandler = useCallback((e) => {
		onChange(e.target.value);
	}, [onChange]);

	return (
		<div className="field-group">
			<label htmlFor={id}>
				{name}
				<input
					ref={inputRef}
					id={id}
					name={name}
					type={type}
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
					aria-label={name}
				/>
			</label>
		</div>
	);
};

// Task list with accessibility (no redundant roles)
const TaskList = ({ items, onToggle, onDelete }: TaskListProps): React.ReactElement => (
	<ul aria-label="Task list">
		{items.map((item) => (
			<li key={item.id}>
				<span>{item.title}</span>
				<span>{item.description}</span>
				<AccessibleButton
					label={item.completed ? 'Mark incomplete' : 'Mark complete'}
					onClick={() => onToggle(item.id)}
					disabled={false}
					variant="primary"
				/>
				<AccessibleButton
					label="Delete task"
					onClick={() => onDelete(item.id)}
					disabled={false}
					variant="secondary"
				/>
			</li>
		))}
	</ul>
);

// --- Generic component with typed hooks (useState<T>, useRef<T>) ---
const TypedSelect = <T extends string | number>({
	id,
	options,
	selected,
	onChange,
	ariaLabel,
}: SelectProps<T>): React.ReactElement => {
	const selectRef = useRef<HTMLSelectElement>(null);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value: rawValue } = e.target;
		const matchedOption = options.find((opt) => String(opt.value) === rawValue);
		if (matchedOption) {
			onChange(matchedOption.value);
		}
	}, [onChange, options]);

	return (
		<div className="select-wrapper">
			<label htmlFor={id}>
				{ariaLabel}
				<select
					ref={selectRef}
					id={id}
					value={String(selected)}
					onChange={handleChange}
					aria-label={ariaLabel}
				>
					{options.map((opt) => (
						<option key={String(opt.value)} value={String(opt.value)}>
							{opt.label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

// --- Form with typed state (useState<T>) and event handlers ---
interface RegistrationData {
	username: string;
	email: string;
}

interface ValidationErrors {
	username: string;
	email: string;
}

const RegistrationForm = (): React.ReactElement => {
	const [formData, setFormData] = useState<RegistrationData>({ username: '', email: '' });
	const [errors, setErrors] = useState<ValidationErrors>({ username: '', email: '' });
	const [submitted, setSubmitted] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement>(null);

	const validate = useCallback((data: RegistrationData): ValidationErrors => {
		const result: ValidationErrors = { username: '', email: '' };
		if (data.username.length < 3) {
			result.username = 'Username must be at least 3 characters';
		}
		if (!data.email.includes('@')) {
			result.email = 'Please enter a valid email';
		}
		return result;
	}, []);

	const handleSubmit: FormSubmitHandler = useCallback((e) => {
		e.preventDefault();
		const validationResult = validate(formData);
		setErrors(validationResult);
		const hasErrors = validationResult.username.length > 0 || validationResult.email.length > 0;
		if (!hasErrors) {
			setSubmitted(true);
		}
	}, [formData, validate]);

	const handleUsernameChange = useCallback((value: string) => {
		setFormData((prev) => ({ ...prev, username: value }));
	}, []);

	const handleEmailChange = useCallback((value: string) => {
		setFormData((prev) => ({ ...prev, email: value }));
	}, []);

	if (submitted) {
		return <p>{`Thank you, ${formData.username}! Registration complete.`}</p>;
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit} aria-label="Registration form">
			<InputField
				id="username"
				name="Username"
				value={formData.username}
				onChange={handleUsernameChange}
				placeholder="Enter username"
				type="text"
			/>
			{errors.username.length > 0 ? <span role="alert">{errors.username}</span> : null}

			<InputField
				id="email"
				name="Email"
				value={formData.email}
				onChange={handleEmailChange}
				placeholder="Enter email"
				type="email"
			/>
			{errors.email.length > 0 ? <span role="alert">{errors.email}</span> : null}

			<button type="submit">Register</button>
		</form>
	);
};

// --- Accessible media and navigation ---
const MediaSection = (): React.ReactElement => {
	const [count, setCount] = useState(0);

	const increment = useCallback(() => {
		setCount((prev) => prev + 1);
	}, []);

	// useEffect with proper dependency array
	useEffect(() => {
		const title = `Count: ${count}`;
		document.title = title;
	}, [count]);

	// useMemo for computed values
	const statusText = useMemo(() => (count > 10 ? 'High count' : 'Low count'), [count]);

	return (
		<main>
			<h1>Media Section</h1>

			{/* jsx-a11y/alt-text: always provide alt */}
			<img src="/photo.jpg" alt="A scenic landscape" />

			{/* jsx-a11y/iframe-has-title */}
			<iframe src="https://example.com" title="Embedded content" />

			{/* jsx-a11y/anchor-is-valid: proper href */}
			<nav aria-label="Main navigation">
				<a href="/home">Home</a>
				<a href="/about">About</a>
			</nav>

			{/* jsx-a11y/no-noninteractive-tabindex: use tabIndex 0 or -1 */}
			<section tabIndex={-1} aria-label="Status section">
				<p>{`Current count: ${count}`}</p>
				<p>{statusText}</p>
			</section>

			{/* react/button-has-type */}
			<button type="button" onClick={increment}>Increment</button>

			{/* Accessible table */}
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Count</td>
						<td>{count}</td>
					</tr>
				</tbody>
			</table>
		</main>
	);
};

// --- Export all components ---
export {
	AccessibleButton,
	InputField,
	TaskList,
	TypedSelect,
	RegistrationForm,
	MediaSection,
};

// Re-export types
export type {
	ButtonProps,
	InputFieldProps,
	ListItem,
	TaskListProps,
	SelectOption,
	SelectProps,
	InputChangeHandler,
	FormSubmitHandler,
	KeyDownHandler,
	RegistrationData,
	ValidationErrors,
};
