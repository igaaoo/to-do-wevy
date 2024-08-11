import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '@/app/login/page';
import AuthContextProvider from '@/context/AuthContextProvider';
import DataContextProvider from '@/context/DataContextProvider';

describe('Login', () => {
  it('Renders login page', () => {
    render(
      <AuthContextProvider>
        <DataContextProvider>
          <LoginPage />
        </DataContextProvider>
      </AuthContextProvider>
    );

    expect(screen.getByText('Realizar Login')).toBeInTheDocument();
  });

  it('Renders error message when user or password is empty', async () => {
    render(
      <AuthContextProvider>
        <DataContextProvider>
          <LoginPage />
        </DataContextProvider>
      </AuthContextProvider>
    );

    const buttons = await screen.findAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(await screen.findByText('Preencha todos os campos!')).toBeInTheDocument();
  });
});