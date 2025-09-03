import React from 'react';
import { toggleTaskCompletion, deleteTask } from '../services/localStorage';

const TaskItem = ({ task, onEdit, onUpdate }) => {
  const handleToggleComplete = async () => {
    try {
      await toggleTaskCompletion(task.id, task.completed);
      onUpdate(); // Refresh the task list
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
        onUpdate(); // Refresh the task list
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    if (taskDate.getTime() === today.getTime()) {
      return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (taskDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString();
  };

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate < new Date();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-actions">
            <button className="btn-icon" onClick={handleEdit} title="Edit task">
              <i className="fas fa-edit"></i>
            </button>
            <button className="btn-icon btn-danger" onClick={handleDelete} title="Delete task">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-footer">
          <div className="task-meta">
            {task.dueDate && (
              <span className={`task-due ${isOverdue() ? 'overdue' : ''}`}>
                <i className="fas fa-calendar"></i>
                {formatDate(task.dueDate)}
                {isOverdue() && <span className="overdue-badge">Overdue</span>}
              </span>
            )}
            <span className="task-date">
              <i className="fas fa-clock"></i>
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <label className="task-toggle">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="toggle-input"
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">
              {task.completed ? 'Completed' : 'Mark complete'}
            </span>
          </label>
        </div>
      </div>
      
      <style jsx>{`
        .task-item {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #4361ee;
          transition: all 0.3s ease;
        }
        
        .task-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
        
        .task-item.completed {
          opacity: 0.7;
          border-left-color: #28a745;
        }
        
        .task-item.overdue {
          border-left-color: #dc3545;
        }
        
        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        
        .task-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
          flex: 1;
        }
        
        .task-item.completed .task-title {
          text-decoration: line-through;
          color: #6c757d;
        }
        
        .task-actions {
          display: flex;
          gap: 8px;
        }
        
        .btn-icon {
          background: none;
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          color: #6c757d;
          transition: all 0.3s ease;
        }
        
        .btn-icon:hover {
          background-color: #f8f9fa;
          color: #4361ee;
        }
        
        .btn-danger:hover {
          color: #dc3545;
        }
        
        .task-description {
          margin: 0 0 16px 0;
          color: #6c757d;
          line-height: 1.5;
        }
        
        .task-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .task-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .task-due,
        .task-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #6c757d;
        }
        
        .task-due.overdue {
          color: #dc3545;
          font-weight: 600;
        }
        
        .overdue-badge {
          background-color: #dc3545;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          margin-left: 6px;
        }
        
        .task-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        
        .toggle-input {
          display: none;
        }
        
        .toggle-slider {
          width: 40px;
          height: 20px;
          background-color: #ccc;
          border-radius: 20px;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .toggle-slider:before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: white;
          top: 2px;
          left: 2px;
          transition: all 0.3s ease;
        }
        
        .toggle-input:checked + .toggle-slider {
          background-color: #28a745;
        }
        
        .toggle-input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }
        
        .toggle-label {
          font-size: 14px;
          color: #6c757d;
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .task-footer {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .task-meta {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default TaskItem;