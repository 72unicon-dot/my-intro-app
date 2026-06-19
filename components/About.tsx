type Props = { summary: string };

export default function About({ summary }: Props) {
  return (
    <section id="about">
      <h2>About</h2>
      <p className="whitespace-pre-line leading-relaxed text-slate-700">{summary}</p>
    </section>
  );
}
