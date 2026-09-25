import Image from 'next/image';
import { IMG } from '@/lib/images';

/** Theme-graded WebP photo with a blurred placeholder. Fills its parent (give the parent a size / aspect ratio). */
export default function Photo({ k, alt = '', className = '', priority = false }: { k: string; alt?: string; className?: string; priority?: boolean }) {
  const m = IMG[k];
  if (!m) return null;
  return (
    <Image src={m.src} alt={alt} width={m.w} height={m.h} placeholder="blur" blurDataURL={m.blur} priority={priority}
      className={`photo-img absolute inset-0 w-full h-full object-cover ${className}`} />
  );
}
