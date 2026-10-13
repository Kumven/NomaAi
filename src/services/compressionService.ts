import imageCompression from 'browser-image-compression';

export interface CompressionResult {
  file: File;
  previewUrl: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  compressionRatio: number;
  compressionTimeMs: number;
  width: number;
  height: number;
}

export async function compressCropImage(
  imageFile: File,
  maxSizeMB = 0.5,
  maxWidthOrHeight = 1200
): Promise<CompressionResult> {
  const startTime = performance.now();
  const originalSizeBytes = imageFile.size;

  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
    fileType: 'image/jpeg'
  };

  let compressedFile: File;

  try {
    // Attempt standard browser-image-compression
    compressedFile = await imageCompression(imageFile, options);
  } catch (err) {
    console.warn('browser-image-compression fallback triggered:', err);
    // Lightweight canvas compression fallback if WebWorker isn't available
    compressedFile = await fallbackCanvasCompress(imageFile, maxWidthOrHeight, 0.7);
  }

  const endTime = performance.now();
  const compressedSizeBytes = compressedFile.size;
  const compressionRatio = Math.max(
    0,
    Math.round(((originalSizeBytes - compressedSizeBytes) / originalSizeBytes) * 100)
  );

  const previewUrl = URL.createObjectURL(compressedFile);

  // Get image dimensions
  const dimensions = await getImageDimensions(previewUrl);

  return {
    file: compressedFile,
    previewUrl,
    originalSizeBytes,
    compressedSizeBytes,
    compressionRatio,
    compressionTimeMs: Math.round(endTime - startTime),
    width: dimensions.width,
    height: dimensions.height
  };
}

function fallbackCanvasCompress(file: File, maxDim: number, quality: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(newFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image in fallback'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600 });
    };
  });
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
