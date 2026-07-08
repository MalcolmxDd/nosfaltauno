"use client";

import styles from './ChipButton.module.css';

interface ChipButtonProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export default function ChipButton({ label, selected, onClick }: ChipButtonProps) {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`${styles.chip} ${selected ? styles.chipActive : ''}`}
        >
            {label}
        </button>
    );
}
