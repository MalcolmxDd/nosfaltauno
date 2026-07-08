"use client";

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MatchCard from '@/components/MatchCard';
import FilterBar, { FilterState } from '@/components/FilterBar';
import dynamic from 'next/dynamic';
import '@/components/DynamicMap.css';
import { getAllMatches } from '@/data/store';
import EmptyState from '@/components/ui/EmptyState';
import { SearchX, Footprints } from 'lucide-react';
import styles from './Feed.module.css';

const DynamicMap = dynamic(() => import('@/components/DynamicMap'), { ssr: false });

function FeedContent() {
    const searchParams = useSearchParams();
    const viewMode = searchParams.get('view') === 'map' ? 'map' : 'list';

    const [filters, setFilters] = useState<FilterState>({
        level: null,
        price: null,
        date: null
    });

    const filteredMatches = useMemo(() => {
        return getAllMatches().filter((match: any) => {
            if (!match.isJoined) return false;
            if (filters.level && match.level !== filters.level) return false;
            if (filters.price) {
                if (filters.price === 'Gratis' && match.price !== 'Gratis') return false;
                if (filters.price === 'Pagado' && match.price === 'Gratis') return false;
            }
            if (filters.date) {
                const matchDate = match.date.toLowerCase();
                if (filters.date === 'Hoy' && !matchDate.includes('hoy')) return false;
                if (filters.date === 'Mañana' && !matchDate.includes('mañana')) return false;
            }
            return true;
        });
    }, [filters]);

    const isEmpty = filteredMatches.length === 0;

    return (
        <div className="container" style={{ paddingBottom: '6rem' }}>
            <div className={styles.feedHeader}>
                <h1 className={styles.feedTitle}>Partidos</h1>
                <p className={styles.feedSubtitle}>Tus próximos partidos</p>
            </div>
            <FilterBar onFilterChange={setFilters} />

            {viewMode === 'list' ? (
                isEmpty ? (
                    <EmptyState
                        icon={SearchX}
                        title="No tienes partidos próximos"
                        message="Explora partidos disponibles y únete a uno."
                        action={{
                            label: 'Descubrir partidos',
                            onClick: () => window.location.href = '/discover'
                        }}
                    />
                ) : (
                    <div className={styles.cardList}>
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
