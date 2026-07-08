"use client";

import { useState } from 'react';
import { Filter, Check } from 'lucide-react';

interface FilterBarProps {
    onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
    level: string | null;
    price: string | null;
    date: string | null;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        level: null,
        price: null,
        date: null
    });

    const handleFilterClick = (type: keyof FilterState, value: string) => {
        const newFilters = {
            ...filters,
            [type]: filters[type] === value ? null : value
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const newFilters = { level: null, price: null, date: null };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        backgroundColor: isOpen || activeFiltersCount > 0 ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                        color: isOpen || activeFiltersCount > 0 ? 'white' : 'var(--foreground)',
                        border: '1px solid var(--border)',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Filter size={16} />
                    Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>

                {/* Quick Filters (Chips) */}
                {['Principiante', 'Intermedio', 'Avanzado'].map((level) => (
                    <button
                        key={level}
                        onClick={() => handleFilterClick('level', level)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            backgroundColor: filters.level === level ? 'hsl(var(--primary) / 0.1)' : 'transparent',
                            color: filters.level === level ? 'hsl(var(--primary))' : 'var(--muted-foreground)',
                            border: `1px solid ${filters.level === level ? 'hsl(var(--primary))' : 'var(--border)'}`,
                            whiteSpace: 'nowrap',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {level}
                    </button>
                ))}
            </div>

            {/* Expanded Filters Panel */}
            {isOpen && (
                <div style={{
                    marginTop: '0.5rem',
                    padding: '1rem',
                    backgroundColor: 'hsl(var(--card))',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Filtros Avanzados</h3>
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={clearFilters}
                                style={{ fontSize: '0.8rem', color: 'hsl(var(--destructive))', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Limpiar todo
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {/* Price Filter */}
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Precio</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {['Gratis', 'Pagado'].map((price) => (
                                    <button
                                        key={price}
                                        onClick={() => handleFilterClick('price', price)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '0.5rem',
                                            backgroundColor: filters.price === price ? 'hsl(var(--primary))' : 'hsl(var(--background))',
                                            color: filters.price === price ? 'white' : 'var(--foreground)',
                                            border: '1px solid var(--border)',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {filters.price === price && <Check size={12} />}
                                        {price}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Filter */}
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Fecha</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {['Hoy', 'Mañana', 'Esta semana'].map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => handleFilterClick('date', date)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '0.5rem',
                                            backgroundColor: filters.date === date ? 'hsl(var(--primary))' : 'hsl(var(--background))',
                                            color: filters.date === date ? 'white' : 'var(--foreground)',
                                            border: '1px solid var(--border)',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {filters.date === date && <Check size={12} />}
                                        {date}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
