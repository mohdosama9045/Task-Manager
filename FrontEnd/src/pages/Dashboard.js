import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks, getTaskStatistics, logoutUser } from '../services/localStorage';

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, dueToday: 0, overdue: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = () => {
    const userTasks = getTasks(user.id);
    setTasks(userTasks);
    filterTasks(userTasks, searchTerm, filter);
    updateStatistics(userTasks);
  };

  const updateStatistics = (tasksList) => {
    const statistics = getTaskStatistics(user.id);
    setStats(statistics);
  };

  const filterTasks = (tasksList, search, statusFilter) => {
    let filtered = tasksList;

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task =>
        statusFilter === 'completed' ? task.completed : !task.completed
      );
    }

    setFilteredTasks(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterTasks(tasks, term, filter);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    filterTasks(tasks, searchTerm, newFilter);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormClose = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    loadTasks(); // Reload tasks after form closes
  };

  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <h1>Welcome back, {user.name}!</h1>
          <div className="user-info">
            <span>{user.email}</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.dueToday}</div>
            <div className="stat-label">Due Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-row">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => handleFilterChange('pending')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => handleFilterChange('completed')}
            >
              Completed
            </button>
          </div>

          <button className="btn btn-primary" onClick={handleAddTask}>
            <i className="fas fa-plus"></i>
            Add New Task
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onEditTask={handleEditTask}
          onTaskUpdate={loadTasks}
        />
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onClose={handleTaskFormClose}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default Dashboard;