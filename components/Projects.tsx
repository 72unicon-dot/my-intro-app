import type { Project } from "@/lib/types";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  if (projects.length === 0) return null;
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.id}
            className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100"
          >
            {p.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image_url}
                alt={p.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.description}</p>
              {p.demo_url && (
                <a
                  href={p.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-brand-600 hover:underline"
                >
                  데모 보기 ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
