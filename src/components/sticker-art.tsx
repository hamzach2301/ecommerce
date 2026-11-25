export function StickerArt({ art, colors, className = "", name, category }: { art: string; colors: [string, string]; className?: string; name?: string; category?: string }) {
  const title = name ? name.split(" ").slice(0, 2).join(" ").toUpperCase() : "STICKLY EDITION";
  return <div className={`product-art ${className}`} style={{ background: `linear-gradient(145deg, ${colors[0]}, ${colors[1]})` }} aria-label={name ? `معاينة تصميم ${name}` : "معاينة تصميم مطبوع"}>
    <i className="product-mark" aria-hidden="true" />
    <div className="product-sheet" style={{ color: colors[0] }}><small>STICKLY / {category?.toUpperCase() ?? "PRINT EDITION"}</small><strong>{title}</strong><span>EDITION {art}</span></div>
  </div>;
}
