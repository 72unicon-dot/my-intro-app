type Props = { email: string };

export default function Contact({ email }: Props) {
  return (
    <section id="contact" className="text-center">
      <h2>Contact</h2>
      <p className="text-slate-600">함께 만들고 싶은 프로젝트가 있다면 연락 주세요.</p>
      <a
        href={`mailto:${email}`}
        className="mt-4 inline-block rounded-full border border-brand-600 px-6 py-3 text-brand-600 hover:bg-brand-50"
      >
        {email}
      </a>
    </section>
  );
}
