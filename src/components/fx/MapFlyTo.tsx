import * as React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '../../lib/cn';

interface Props {
  lat: number;
  lng: number;
  /** Address lines shown in the overlay card that reveals after the fly-in. */
  addressLines: string[];
  label?: string;
  /** Final zoom level after the fly-in. */
  zoom?: number;
  /** Mapbox access token. Falls back to PUBLIC_MAPBOX_TOKEN. */
  token?: string;
  /** Shown when no token is configured (e.g. the existing Google Maps embed). */
  fallbackSrc?: string;
  className?: string;
}

const TOKEN =
  (typeof import.meta.env !== 'undefined' &&
    (import.meta.env.PUBLIC_MAPBOX_TOKEN as string | undefined)) ||
  undefined;

export function MapFlyTo({
  lat,
  lng,
  addressLines,
  label = 'S.Prestige Services',
  zoom = 16,
  token,
  fallbackSrc,
  className,
}: Props): React.ReactElement {
  const accessToken = token || TOKEN;
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || !accessToken || !containerRef.current) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: reduceMotion ? [lng, lat] : [lng, lat - 0.9],
      zoom: reduceMotion ? zoom : 4.5,
      pitch: reduceMotion ? 45 : 0,
      bearing: 0,
      interactive: true,
      attributionControl: true,
      cooperativeGestures: true,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    const el = document.createElement('div');
    el.className = 'sp-map-marker';
    new mapboxgl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([lng, lat])
      .addTo(map);

    let revealTimer: number | undefined;

    map.on('load', () => {
      if (reduceMotion) {
        setRevealed(true);
        return;
      }
      map.flyTo({
        center: [lng, lat],
        zoom,
        pitch: 55,
        bearing: -18,
        duration: 6000,
        essential: true,
        curve: 1.5,
      });
      revealTimer = window.setTimeout(() => setRevealed(true), 4200);
    });

    return () => {
      if (revealTimer) window.clearTimeout(revealTimer);
      map.remove();
    };
  }, [mounted, accessToken, lat, lng, zoom]);

  // Server render and first client render match: a neutral placeholder.
  // The client effect then swaps in the map (or fallback) once mounted.
  if (!mounted) {
    return (
      <div
        className={cn(
          'h-[360px] rounded-xl border border-gold/12 bg-bg shadow-card md:h-[440px]',
          className,
        )}
      />
    );
  }

  if (!accessToken) {
    if (fallbackSrc) {
      return (
        <div
          className={cn(
            'overflow-hidden rounded-xl border border-gold/12 bg-bg shadow-card',
            className,
          )}
        >
          <iframe
            title={`${label} — map`}
            src={fallbackSrc}
            loading="lazy"
            className="h-[360px] w-full md:h-[440px]"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      );
    }
    return (
      <div
        className={cn(
          'grid h-[360px] place-items-center rounded-xl border border-gold/12 bg-bg text-sm text-fg-muted shadow-card md:h-[440px]',
          className,
        )}
      >
        Map unavailable — set PUBLIC_MAPBOX_TOKEN.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-gold/12 bg-bg shadow-card',
        className,
      )}
    >
      <style>{`
        .sp-map-marker {
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: rgb(var(--gold));
          box-shadow: 0 0 0 4px rgba(199, 154, 15, 0.28), 0 0 18px 4px rgba(199, 154, 15, 0.5);
          animation: sp-map-pulse 2.4s ease-out infinite;
        }
        @keyframes sp-map-pulse {
          0% { box-shadow: 0 0 0 0 rgba(199, 154, 15, 0.45), 0 0 18px 4px rgba(199, 154, 15, 0.5); }
          70% { box-shadow: 0 0 0 16px rgba(199, 154, 15, 0), 0 0 18px 4px rgba(199, 154, 15, 0.5); }
          100% { box-shadow: 0 0 0 0 rgba(199, 154, 15, 0), 0 0 18px 4px rgba(199, 154, 15, 0.5); }
        }
        .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib { opacity: 0.55; }
      `}</style>
      <div ref={containerRef} className="h-[360px] w-full md:h-[440px]" />
      <div
        className={cn(
          'pointer-events-none absolute bottom-4 left-4 right-4 rounded-lg border border-gold/20 bg-bg/85 p-4 backdrop-blur-md transition-all duration-700 ease-out md:right-auto md:max-w-xs',
          revealed
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0',
        )}
      >
        <div className="font-display text-base text-gold">{label}</div>
        {addressLines.map((line, i) => (
          <div key={i} className="mt-0.5 text-sm text-fg-muted">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
