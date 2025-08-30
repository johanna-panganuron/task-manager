// src/components/SearchFilters.js
'use client';

import { useState } from 'react';
import styles from '../styles/SearchFilters.module.scss';

export default function SearchFilters({ filters, onFiltersChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...localFilters,
      [name]: value
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className={styles.searchFilters}>
      <input
        type="text"
        name="search"
        placeholder="Search tasks..."
        value={localFilters.search}
        onChange={handleChange}
        className={styles.searchInput}
      />

      <select
        name="status"
        value={localFilters.status}
        onChange={handleChange}
        className={styles.filterSelect}
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="priority"
        value={localFilters.priority}
        onChange={handleChange}
        className={styles.filterSelect}
      >
        <option value="">All Priorities</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    </div>
  );
}