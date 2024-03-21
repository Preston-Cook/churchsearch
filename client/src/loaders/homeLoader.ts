import BASE_API_ENDPOINT from '../config';

export default async function homeLoader() {
  const res = await fetch(`${BASE_API_ENDPOINT}/churches/featured`);

  if (!res.ok) {
    throw new Response('Something Went Wrong', {
      status: 400,
    });
  }

  const data = await res.json();
  return data;
}
