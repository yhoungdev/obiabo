
export function portableTextToHtml(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  return blocks.map(block => {
    if (block._type !== 'block' || !block.children) return '';
    const text = block.children.map((child: any) => {
      let t = child.text;
      if (child.marks && child.marks.includes('em')) t = `<em>${t}</em>`;
      if (child.marks && child.marks.includes('strong')) t = `<strong>${t}</strong>`;
      return t;
    }).join('');
    switch (block.style) {
      case 'h1': return `<h1>${text}</h1>`;
      case 'h2': return `<h2>${text}</h2>`;
      case 'h3': return `<h3>${text}</h3>`;
      case 'blockquote': return `<blockquote>${text}</blockquote>`;
      default: return `<p>${text}</p>`;
    }
  }).join('\n');
}
