import { Circle } from 'lucide-react';

export default function MapMock() {
    return (
        <div style={{
            width: '100%',
            height: '60vh',
            backgroundColor: '#e5e7eb',
            borderRadius: 'var(--radius)',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'hsl(var(--primary))',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '50%',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Circle size={24} color="white" fill="white" />
            </div>

            <div style={{
                position: 'absolute',
                top: '30%',
                left: '40%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'hsl(var(--secondary))',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '50%',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Circle size={24} color="white" fill="white" />
            </div>

            <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                backgroundColor: 'white',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                color: 'black'
            }}>
                Vista de Mapa (Mock)
            </div>
        </div>
    );
}
