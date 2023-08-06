/*
Write unit tests for a Login component which check the following:
1. The component renders a form with two inputs and a submit button.
2. Clicking the text "sign up" renders an input with the label "Username".
3. Typing in the "Email" input updates the value of the input.
4. Typing in the "Password" input updates the value of the input.
*/

// Path: src/tests/Login.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

describe('The Login component', () => {
    test('renders a clickable submit button', () => {
        render(<Login />);
        const submitButton = screen.getByRole('button', {name: 'Submit'});
        expect(submitButton).toBeInTheDocument();
    });
    
    test('clicking the text "Click here" renders an input with the label "Username"', () => {
        render(<Login />);
        const signUpText = screen.getAllByText('Click here')[0];
        fireEvent.click(signUpText);
        const usernameInput = screen.getByLabelText('Username');
        expect(usernameInput).toBeInTheDocument();
    });
    
    test('typing in the "Email" input updates the value of the input', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText('Email');
        fireEvent.change(emailInput, {target: {value: 'test'}});
        expect(emailInput.value).toBe('test');
    });

    test('typing in the "Password" input updates the value of the input', () => {
        render(<Login />);
        const passwordInput = screen.getByLabelText('Password');
        fireEvent.change(passwordInput, {target: {value: 'test'}});
        expect(passwordInput.value).toBe('test');
    });

    test('typing in the "Username" input updates the value of the input', () => {
        render(<Login />);
        const signUpText = screen.getByText('Click here');
        fireEvent.click(signUpText);
        const usernameInput = screen.getByLabelText('Username');
        fireEvent.change(usernameInput, {target: {value: 'test'}});
        expect(usernameInput.value).toBe('test');
    });
});

// describe('Clicking the "Forgot password" button', () => {
//     test('renders a popup modal with text input, submit and cancel buttons', () => {
//         render(<Login />);
//         const forgotPasswordText = screen.getByText('Click here.');
//         fireEvent.click(forgotPasswordText);
//         const modal = screen.getByRole('dialog');
//         const submitButton = screen.getAllByRole('button', {name: 'Submit'});
//         const cancelButton = screen.getByRole('button', {name: 'Cancel'});
//         const emailInput = screen.getAllByLabelText('Email');
//         expect(modal).toBeInTheDocument();
//         expect(submitButton[1]).toBeInTheDocument();
//         expect(cancelButton).toBeInTheDocument();
//         expect(emailInput).toBeInTheDocument();
//     });

// })