export default function Page({ params }: { params: { id: string } }) {
  return <p>Checking shareability of flow with id: {params.id}</p>;
}
