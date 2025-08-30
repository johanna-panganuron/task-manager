// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';
import SearchFilters from '../components/SearchFilters';
import styles from '../styles/Home.module.scss';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.priority) queryParams.append('priority', filters.priority);

      const response = await fetch(`${API_BASE_URL}/tasks?${queryParams}`);
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.data);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/stats`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Create task
  const createTask = async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => [data.data, ...prev]);
        setShowForm(false);
        fetchStats();
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      return { success: false, error: 'Failed to create task' };
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.map(task => 
          task._id === id ? data.data : task
        ));
        setEditingTask(null);
        fetchStats();
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      return { success: false, error: 'Failed to update task' };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.filter(task => task._id !== id));
        fetchStats();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  // Quick status update
  const updateTaskStatus = async (id, status) => {
    await updateTask(id, { status });
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filters]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Task Manager</h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowForm(true)}
        >
          + Add Task
        </button>
      </header>

      {stats && <TaskStats stats={stats} />}

      <SearchFilters 
        filters={filters} 
        onFiltersChange={setFilters} 
      />

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {showForm && (
        <TaskForm 
          onSubmit={createTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm 
          task={editingTask}
          onSubmit={(data) => updateTask(editingTask._id, data)}
          onCancel={() => setEditingTask(null)}
          isEditing
        />
      )}

      <TaskList 
        tasks={tasks}
        loading={loading}
        onEdit={setEditingTask}
        onDelete={deleteTask}
        onStatusChange={updateTaskStatus}
      />
    </div>
  );
}
