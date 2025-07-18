export const dynamic = "force-dynamic";

export default function RegisterPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <div>
      <h1>Регистрация</h1>
      <p>Параметры: {JSON.stringify(searchParams)}</p>
    </div>
  );
}
