// src/components/TaskStats.js
import styles from '../styles/TaskStats.module.scss';

export default function TaskStats({ stats }) {
  const getCompletionRate = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.total}</div>
        <div className={styles.statLabel}>Total Tasks</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.pending}</div>
        <div className={styles.statLabel}>Pending</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats['in-progress']}</div>
        <div className={styles.statLabel}>In Progress</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.completed}</div>
        <div className={styles.statLabel}>Completed</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{getCompletionRate()}%</div>
        <div className={styles.statLabel}>Completion Rate</div>
      </div>
    </div>
  );
}
