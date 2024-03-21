import BASE_API_ENDPOINT from '../config';

export default async function searchLoader({ request }: LoaderParams) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  let data;
  try {
    const res = await fetch(`${BASE_API_ENDPOINT}/churches/search?q=${query}`);
    data = await res.json();

    if (!res.ok) {
      throw new Response('Something Went Wrong', { status: 400 });
    }
  } catch {
    throw new Response('Something Went Wrong', { status: 500 });
  }

  let data2;
  try {
    const res = await fetch(`${BASE_API_ENDPOINT}/users/geolocate`);
    data2 = await res.json();

    if (!res.ok) {
      throw new Response('Something Went Wrong', { status: 400 });
    }
  } catch {
    throw new Response('Something Went Wrong', { status: 500 });
  }
  // Get user location

  return [data.data, data2.data];
}
