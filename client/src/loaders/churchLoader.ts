import BASE_API_ENDPOINT from '../config';

export default async function churchLoader({ params }: LoaderParams) {
  const { id } = params;

  const res = await fetch(`${BASE_API_ENDPOINT}/churches/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Response('Invalid Church', {
        status: 404,
      });
    } else {
      throw new Response('Something Went Wrong', {
        status: 400,
      });
    }
  }

  const data = await res.json();
  return data.data;
}
