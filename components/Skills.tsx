import type { Skill } from "@/lib/types";

type Props = { skills: Skill[] };

const levelColor: Record<string, string> = {
  "학습 중": "bg-slate-100 text-slate-700",
  가능: "bg-brand-50 text-brand-700",
  능숙: "bg-emerald-50 text-emerald-700"
};

export default function Skills({ skills }: Props) {
  if (skills.length === 0) return null;
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{s.skill_name}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  levelColor[s.level] ?? "bg-slate-100 text-slate-700"
                }`}
              >
                {s.level}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{s.skill_desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
