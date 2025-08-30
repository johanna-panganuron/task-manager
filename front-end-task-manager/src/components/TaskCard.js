// src/components/TaskCard.js
'use client';

import { useState } from 'react';
import styles from '../styles/TaskCard.module.scss';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);
    await onStatusChange(task._id, newStatus);
    setUpdatingStatus(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`${styles.taskCard} ${styles[task.priority]} ${isOverdue ? styles.overdue : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
      </div>

      <p className={styles.description}>{task.description}</p>

      <div className={styles.metadata}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles[task.status.replace('-', '_')]}`}>
            {task.status.replace('-', ' ')}
          </span>
          <span className={`${styles.badge} ${styles.priority} ${styles[task.priority]}`}>
            {task.priority} priority
          </span>
        </div>

        {task.dueDate && (
          <div className={styles.dueDate}>
            <span>Due: {formatDate(task.dueDate)}</span>
            {isOverdue && <span className={styles.overdueLabel}>Overdue</span>}
          </div>
        )}
      </div>

      <div className={styles.statusControls}>
        <label>Status:</label>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={updatingStatus}
          className={styles.statusSelect}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {updatingStatus && <span className={styles.updating}>Updating...</span>}
      </div>

      <div className={styles.actions}>
        <button 
          onClick={() => onEdit(task)}
          className={styles.editButton}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task._id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>

      <div className={styles.footer}>
        <small>Created: {formatDate(task.createdAt)}</small>
        {task.updatedAt !== task.createdAt && (
          <small>Updated: {formatDate(task.updatedAt)}</small>
        )}
      </div>
    </div>
  );
}