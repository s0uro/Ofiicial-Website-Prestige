export interface GoogleReview {
  quote: string;
  who: string;
  rating: number;
}

export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return [];

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=en&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return [];

    const data = await res.json();
    const reviews: any[] = data.result?.reviews ?? [];

    return reviews
      .filter((r) => r.text && r.rating >= 4)
      .map((r) => ({
        quote: r.text.replace(/\n+/g, ' ').trim(),
        who: r.author_name ?? 'Customer',
        rating: r.rating as number,
      }));
  } catch {
    return [];
  }
}
