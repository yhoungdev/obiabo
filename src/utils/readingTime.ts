// Calculate reading time based on text content
export function calculateReadingTime(blocks: any[]): number {
  if (!blocks) return 0;
  
  let totalWords = 0;
  
  blocks.forEach(block => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          totalWords += child.text.split(/\s+/).length;
        }
      });
    }
  });
  
  // Average reading speed is 200 words per minute
  const readingTimeMinutes = Math.ceil(totalWords / 200);
  return Math.max(1, readingTimeMinutes);
}
