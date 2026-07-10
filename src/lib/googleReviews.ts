export interface GoogleReview {
  quote: string;
  who: string;
  rating: number;
}

export interface GooglePlaceData {
  reviews: GoogleReview[];
  rating: number | null;
  userRatingCount: number | null;
}

export async function fetchGoogleReviews(): Promise<GooglePlaceData> {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.GOOGLE_PLACE_ID;

  const empty: GooglePlaceData = { reviews: [], rating: null, userRatingCount: null };

  if (!apiKey || !placeId) return empty;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=en&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return empty;

    const data = await res.json();
    const rawReviews: any[] = data.result?.reviews ?? [];
    const rating: number | null = data.result?.rating ?? null;
    const userRatingCount: number | null = data.result?.user_ratings_total ?? null;

    const reviews = rawReviews
      .filter((r) => r.text && r.rating >= 4)
      .map((r) => ({
        quote: r.text.replace(/\n+/g, ' ').trim(),
        who: r.author_name ?? 'Customer',
        rating: r.rating as number,
      }));

    return { reviews, rating, userRatingCount };
  } catch {
    return empty;
  }
}
