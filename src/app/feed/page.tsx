"use client";

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MatchCard from '@/components/MatchCard';
import dynamic from 'next/dynamic';
import '@/components/DynamicMap.css';
import { MOCK_MATCHES } from '@/data/mocks';

// Load DynamicMap only on the client (no SSR)
const DynamicMap = dynamic(() => import('@/components/DynamicMap'), { ssr: false });
// import MapMock from '@/components/MapMock'; // reemplazado por DynamicMap

const FILTERS = ['Todos', 'Hoy', 'Mañana', 'Competitivo', 'Amistoso'] as const;
type FilterType = (typeof FILTERS)[number];

function applyFilter(matches: typeof MOCK_MATCHES, activeFilter: FilterType) {
    if (activeFilter === 'Todos') return matches;

    // Filtros muy simples basados en el mock actual
    if (activeFilter === 'Hoy') {
        return matches.filter((m) => m.date.toLowerCase().includes('hoy'));
    }
    if (activeFilter === 'Mañana') {
        return matches.filter((m) => m.date.toLowerCase().includes('mañana'));
    }
    if (activeFilter === 'Competitivo') {
        return matches.filter((m) => m.level.toLowerCase() === 'avanzado' || m.level.toLowerCase() === 'intermedio');
    }
    if (activeFilter === 'Amistoso') {
        return matches.filter((m) => m.level.toLowerCase().includes('principiante') || m.price.toLowerCase().includes('gratis'));
    }

    return matches;
}

function FeedContent() {
    const searchParams = useSearchParams();
    const viewMode = searchParams.get('view') === 'map' ? 'map' : 'list';
    const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');

    const filteredMatches = useMemo(
        () => applyFilter(MOCK_MATCHES, activeFilter),
        [activeFilter]
    );

    const isEmpty = filteredMatches.length === 0;

    return (
        <div className="container">
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
                {FILTERS.map((filter) => {
                    const isActive = activeFilter === filter;
                    return (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '2rem',
                                backgroundColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                                color: isActive ? 'white' : 'var(--foreground)',
                                border: 'none',
                                fontSize: '0.875rem',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease, transform 0.1s ease',
                                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                            }}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            {viewMode === 'list' ? (
                isEmpty ? (
                    <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>No encontramos partidos con este filtro.</p>
                        <p style={{ fontSize: '0.9rem' }}>Prueba cambiando los filtros o crea un nuevo partido.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredMatches.map((match) => (
                            <MatchCard key={match.id} match={match} />
                        ))}
                    </div>
                )
            ) : (
                <DynamicMap />
            )}
        </div>
    );
}

export default function FeedPage() {
    return (
        <Suspense fallback={<div className="container">Cargando...</div>}>
            <FeedContent />
        </Suspense>
    );
}
