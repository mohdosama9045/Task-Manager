import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEditTask, onTaskUpdate }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-tasks"></i>
        <h3>No tasks found</h3>
        <p>Get started by creating your first task!</p>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onUpdate={onTaskUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;