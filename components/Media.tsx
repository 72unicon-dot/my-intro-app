import type { Media } from "@/lib/types";

type Props = { media: Media[] };

// YouTube/Vimeo URL → 임베드 URL 변환 (간단 버전)
function toEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return url;
  } catch {
    return null;
  }
}

export default function MediaSection({ media }: Props) {
  if (media.length === 0) return null;

  const images = media.filter((m) => m.image_url);
  const videos = media.filter((m) => m.video_url);

  return (
    <section id="media">
      <h2>Media</h2>

      {images.length > 0 && (
        <div className="mb-8 grid grid-cols-2 gap-3">
          {images.map((m) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={m.id}
              src={m.image_url!}
              alt={m.caption ?? "media"}
              className="h-40 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      {videos.map((m) => {
        const embed = toEmbed(m.video_url!);
        if (!embed) return null;
        return (
          <div key={m.id} className="mb-6">
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow">
              <iframe
                src={embed}
                title={m.caption ?? "자기소개 영상"}
                className="h-full w-full"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {m.caption && (
              <p className="mt-2 text-center text-sm text-slate-500">{m.caption}</p>
            )}
          </div>
        );
      })}
    </section>
  );
}
