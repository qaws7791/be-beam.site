import { useRef } from 'react';
import type { ChangeEvent } from 'react';
import CameraIcon from '@/components/atoms/icons/CameraIcon';
import CloseIcon from '@/components/atoms/icons/CloseIcon';

type ImageUploaderProps = {
  images: File[];
  maxImages?: number;
  onImagesChange: (images: File[]) => void;
};

export const ImageUploader = ({
  images,
  maxImages = 10,
  onImagesChange,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).slice(0, maxImages - images.length);
    if (newImages.length === 0) return;

    const updatedImages = [...images, ...newImages];
    onImagesChange(updatedImages);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  return (
    <div className="flex gap-2">
      {images.map((image) => (
        <div
          key={`${image.name}-${image.lastModified}`}
          className="relative size-26 overflow-hidden rounded-lg"
        >
          <img
            src={URL.createObjectURL(image)}
            alt={`업로드된 이미지 ${image.name}`}
          />
          <button
            type="button"
            className="absolute top-1.5 right-1.5 size-4 cursor-pointer rounded-full bg-gray-300"
            onClick={() =>
              removeImage(images.findIndex((img) => img === image))
            }
          >
            <CloseIcon className="size-4 text-gray-800" />
          </button>
        </div>
      ))}
      {images.length < maxImages && (
        <label className="flex size-26 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-500">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <CameraIcon className="size-6 text-black" />
          <span className="text-b1 text-gray-500">
            {images.length} / {maxImages}
          </span>
        </label>
      )}
    </div>
  );
};
