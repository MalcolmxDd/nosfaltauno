import { MapPin, Star, Car, ShowerHead, Wifi, Coffee, Phone, Globe } from 'lucide-react';
import { MOCK_MATCHES } from '@/data/mocks';
import styles from '../Venue.module.css';

export function generateStaticParams() {
    return MOCK_MATCHES.map((match) => ({
        id: match.id.toString(),
    }));
}

const venueData = {
    name: "Complejo Deportivo El Golazo",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
    address: "Av. Siempre Viva 123, Santiago",
    rating: 4.5,
    reviewCount: 128,
    description: "El mejor complejo de la zona norte. Contamos con 5 canchas de pasto sintético de última generación, iluminación LED y amplios estacionamientos.",
    amenities: [
        { icon: Car, label: "Estacionamiento" },
        { icon: ShowerHead, label: "Duchas" },
        { icon: Wifi, label: "WiFi Gratis" },
        { icon: Coffee, label: "Cafetería" },
    ],
    contact: {
        phone: "+56 9 1234 5678",
        website: "www.elgolazo.cl"
    },
    reviews: [
        { id: 1, user: "Juan Pérez", rating: 5, comment: "Excelentes canchas, muy bien cuidadas.", date: "Hace 2 días" },
        { id: 2, user: "María González", rating: 4, comment: "Buenos camarines, pero el estacionamiento se llena rápido.", date: "Hace 1 semana" },
    ]
};

export default async function VenuePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const venue = { ...venueData, id };

    return (
        <div className={styles.page}>
            {/* Hero */}
            <div className={styles.hero}>
                <img src={venue.image} alt={venue.name} className={styles.heroImage} />
                <div className={styles.heroOverlay}>
                    <h1 className={styles.heroTitle}>{venue.name}</h1>
                    <p className={styles.heroAddress}>
                        <MapPin size={14} />
                        <span>{venue.address}</span>
                    </p>
                </div>
            </div>

            <div className={styles.content}>
                {/* Rating */}
                <div className={styles.ratingRow}>
                    <span className={styles.ratingBadge}>
                        <Star size={14} fill="white" />
                        {venue.rating}
                    </span>
                    <span className={styles.ratingCount}>({venue.reviewCount} reseñas)</span>
                </div>

                {/* Amenities */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Servicios</h2>
                    <div className={styles.amenities}>
                        {venue.amenities.map((item, idx) => (
                            <div key={idx} className={styles.amenity}>
                                <item.icon size={18} className={styles.amenityIcon} />
                                <span className={styles.amenityLabel}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Información</h2>
                    <p className={styles.desc}>{venue.description}</p>
                    <div className={styles.contactList}>
                        <div className={styles.contactItem}>
                            <Phone size={16} className={styles.contactIcon} />
                            <span className={styles.contactText}>{venue.contact.phone}</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Globe size={16} className={styles.contactIcon} />
                            <span className={styles.contactText}>{venue.contact.website}</span>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Ubicación</h2>
                    <div className={styles.mapPlaceholder}>
                        Mapa Interactivo (Próximamente)
                    </div>
                </div>

                {/* Reviews */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Opiniones</h2>
                    <div className={styles.reviewList}>
                        {venue.reviews.map(review => (
                            <div key={review.id} className={styles.reviewCard}>
                                <div className={styles.reviewTop}>
                                    <span className={styles.reviewUser}>{review.user}</span>
                                    <span className={styles.reviewDate}>{review.date}</span>
                                </div>
                                <div className={styles.reviewStars}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14}
                                            fill={i < review.rating ? 'var(--accent)' : 'transparent'}
                                            color={i < review.rating ? 'var(--accent)' : 'var(--text-secondary)'}
                                        />
                                    ))}
                                </div>
                                <p className={styles.reviewComment}>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
