import type { Profile } from "@/lib/types";

type Props = { profile: Profile; heroImage: string | null };

export default function Hero({ profile, heroImage }: Props) {
  return (
    <section className="text-center">
      {heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroImage}
          alt="대표 이미지"
          className="mx-auto mb-6 h-32 w-32 rounded-full object-cover ring-4 ring-white shadow"
        />
      )}
      <p className="text-sm uppercase tracking-widest text-brand-600">Hello</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold">{profile.name}</h1>
      <p className="mt-4 text-lg text-slate-600">{profile.headline}</p>
      <a
        href="#projects"
        className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-white shadow hover:bg-brand-700"
      >
        프로젝트 보기 →
      </a>
    </section>
  );
}
