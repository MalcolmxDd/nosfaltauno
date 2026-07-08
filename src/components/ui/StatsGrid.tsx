import styles from './StatsGrid.module.css';

interface Stat {
    label: string;
    value: string | number;
}

interface StatsGridProps {
    stats: Stat[];
    columns?: 2 | 3;
}

export default function StatsGrid({ stats, columns = 3 }: StatsGridProps) {
    return (
        <div className={`${styles.grid} ${columns === 2 ? styles.cols2 : styles.cols3}`}>
            {stats.map((stat) => (
                <div key={stat.label} className={styles.card}>
                    <p className={styles.value}>{stat.value}</p>
                    <p className={styles.label}>{stat.label}</p>
                </div>
            ))}
        </div>
    );
}
