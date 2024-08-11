import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from '@/components/table/Datatable';
import { columns } from '@/components/table/Columns';
import { Tasks } from '@/types/tasks';

describe('Tasks Table', () => {
  const data: Tasks[] = [
    {
      id: 1,
      title: 'Title',
      description: 'Description',
      isOpen: true,
      user: 'User',
      priority: 1,
    },
    {
      id: 2,
      title: 'Title',
      description: 'Description',
      isOpen: true,
      user: 'User',
      priority: 1,
    },
    {
      id: 3,
      title: 'Title',
      description: 'Description',
      isOpen: true,
      user: 'User',
      priority: 1,
    },
  ];

  it('Renders Tasks Table', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
      />
    );

    const tasksTable = screen.getByLabelText('tasksTable');
    expect(tasksTable).toBeInTheDocument();
  });

  it('Check if are tasks', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
      />
    );

    const tasksTable = screen.getByLabelText('tasksTable');
    const tasks = screen.getAllByLabelText('taskRow');

    expect(tasksTable).toBeInTheDocument();
    expect(tasks).toHaveLength(3);
  }
  );
});