"use client";

import styles from './TabBar.module.css';

interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface TabBarProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
}

export default function TabBar({ tabs, activeTab, onChange }: TabBarProps) {
    return (
        <div className={styles.tabBar}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    type="button"
                    className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                >
                    {tab.label}
                    {tab.count !== undefined && <span className={styles.count}>({tab.count})</span>}
                </button>
            ))}
        </div>
    );
}
