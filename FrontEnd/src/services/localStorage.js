// User management
export const registerUser = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Check if user already exists
  if (users.find(user => user.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // Note: In real app, hash the password!
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  
  return newUser;
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Task management
export const getTasks = (userId) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return tasks.filter(task => task.userId === userId);
};

export const createTask = (taskData, userId) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTask = {
    id: Date.now().toString(),
    userId,
    ...taskData,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return newTask;
};

export const updateTask = (taskId, updates) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks[taskIndex];
};

export const deleteTask = (taskId) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
};

export const toggleTaskCompletion = (taskId, currentStatus) => {
  return updateTask(taskId, { completed: !currentStatus });
};

// Statistics
export const getTaskStatistics = (userId) => {
  const tasks = getTasks(userId);
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dueToday = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  }).length;
  
  const overdue = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  }).length;
  
  return { total, completed, pending, dueToday, overdue };
};
/*
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  // Add authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(error.message || 'Network error. Please check your connection.');
  }
};

// Auth API
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: userData
  }),
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: credentials
  }),
  getMe: () => apiRequest('/auth/me'),
  logout: () => apiRequest('/auth/logout', {
    method: 'POST'
  })
};

// Tasks API
export const tasksAPI = {
  getAll: () => apiRequest('/tasks'),
  getById: (id) => apiRequest(`/tasks/${id}`),
  create: (taskData) => apiRequest('/tasks', {
    method: 'POST',
    body: taskData
  }),
  update: (id, updates) => apiRequest(`/tasks/${id}`, {
    method: 'PUT',
    body: updates
  }),
  delete: (id) => apiRequest(`/tasks/${id}`, {
    method: 'DELETE'
  }),
  toggle: (id) => apiRequest(`/tasks/${id}/toggle`, {
    method: 'PATCH'
  }),
  getStatistics: () => apiRequest('/tasks/stats')
};

export default apiRequest;
*/