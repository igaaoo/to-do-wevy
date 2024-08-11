import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AuthContextProvider from '@/context/AuthContextProvider';
import DataContextProvider from '@/context/DataContextProvider';
import Home from '@/app/page';

describe('Tasks Card', () => {
  it('Renders Create Task Card', () => {
    render(
      <AuthContextProvider>
        <DataContextProvider>
          <Home />
        </DataContextProvider>
      </AuthContextProvider>
    );

    expect(screen.getByText('Preencha os campos abaixo para criar uma nova tarefa')).toBeInTheDocument();
  });
});