/**
 * @jest-environment jsdom
 */

import SignUp from '@/pages/auth/signup';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

beforeEach(() => render(<SignUp />));
afterEach(() => {
	cleanup();
	jest.restoreAllMocks();
});

describe('sign up form', () => {
	it('should render signup page', () => {
		expect(screen.getByTestId('signup-form')).toBeInTheDocument();
		expect(screen.getByTestId('username-input')).toBeInTheDocument();
		expect(screen.getByTestId('email-input')).toBeInTheDocument();
		expect(screen.getByTestId('password-input')).toBeInTheDocument();
		expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
		expect(screen.getByTestId('submit-button')).toBeInTheDocument();
		expect(
			screen.queryByText('Password did not match.')
		).not.toBeInTheDocument();
	});

	it('should display error message when confirm password did not match', () => {
		fireEvent.change(screen.getByTestId('username-input'), {
			target: { value: 'dayz' },
		});
		fireEvent.change(screen.getByTestId('email-input'), {
			target: { value: 'email@email.com' },
		});
		fireEvent.change(screen.getByTestId('password-input'), {
			target: { value: 'password' },
		});
		fireEvent.change(screen.getByTestId('confirm-password-input'), {
			target: { value: 'password123' },
		});

		fireEvent.submit(screen.getByTestId('signup-form'));

		expect(screen.getByTestId('signup-form')).toHaveFormValues({
			username: 'dayz',
			email: 'email@email.com',
			password: 'password',
			confirmPassword: 'password123',
		});
		expect(screen.queryByText('Password did not match.')).toBeInTheDocument();
	});

	it('should success when every input is valid', async () => {
		const mockFetch = jest.fn().mockResolvedValue({
			success: true,
			error: null,
			data: { username: 'dayz', email: 'email@email.com' },
		});

		fireEvent.change(screen.getByTestId('username-input'), {
			target: { value: 'dayz' },
		});
		fireEvent.change(screen.getByTestId('email-input'), {
			target: { value: 'email@email.com' },
		});
		fireEvent.change(screen.getByTestId('password-input'), {
			target: { value: 'password' },
		});
		fireEvent.change(screen.getByTestId('confirm-password-input'), {
			target: { value: 'password' },
		});

		fireEvent.submit(screen.getByTestId('signup-form'));

		expect(screen.getByTestId('signup-form')).toHaveFormValues({
			username: 'dayz',
			email: 'email@email.com',
			password: 'password',
			confirmPassword: 'password',
		});
		expect(
			screen.queryByText('Password did not match.')
		).not.toBeInTheDocument();
		expect(screen.getByTestId('submit-button')).toBeDisabled();

		await mockFetch();
		expect(mockFetch).toHaveBeenCalled();
		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(mockFetch).toReturn();
	});
});
