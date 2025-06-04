export async function toPng(node) {
  if (!node) throw new Error('Node is required');
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  const clone = node.cloneNode(true);
  const svg = `\n    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\n      <foreignObject width="100%" height="100%">\n        ${new XMLSerializer().serializeToString(clone)}\n      </foreignObject>\n    </svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
}
