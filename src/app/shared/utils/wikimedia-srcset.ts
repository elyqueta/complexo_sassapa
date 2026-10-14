/** Gera um srcset com várias larguras a partir de um thumbnail da Wikimedia Commons. */
export function wikimediaSrcSet(
  src: string,
  widths: readonly number[] = [480, 960, 1280, 1920],
): string {
  if (!/\/\d+px-/.test(src)) return '';
  return widths.map((w) => `${src.replace(/\/\d+px-/, `/${w}px-`)} ${w}w`).join(', ');
}

/** Largura de origem do thumbnail, quando conhecida. */
export function wikimediaWidth(src: string): number | undefined {
  const match = src.match(/\/(\d+)px-/);
  return match ? Number(match[1]) : undefined;
}
