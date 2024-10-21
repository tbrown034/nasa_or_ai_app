import LoadingSpinner from "@/app/UI/LoadingSpinner";
import Image from "next/image";
import { useState } from "react";

const ImagePair = ({
  nasaImageUrl,
  aiImageUrl,
  isNasaFirst,
  selectedImage,
  handleImageClick,
}) => {
  const [nasaImageLoaded, setNasaImageLoaded] = useState(false);
  const [aiImageLoaded, setAiImageLoaded] = useState(false);

  const aspectRatio = "1/1"; // Aspect ratio for square images (changeable)

  const imageContainerClass =
    "relative cursor-pointer transition-transform duration-300 ease-in-out";

  const nasaImage = (
    <div
      key="nasa"
      onClick={() => handleImageClick("nasa")}
      className={`${imageContainerClass} ${
        selectedImage === "nasa"
          ? "border-4 border-blue-500 transform scale-105"
          : selectedImage
          ? "opacity-50"
          : ""
      } border-2 border-white w-full md:w-1/2`} // Responsive sizing
      style={{ aspectRatio }} // Maintain aspect ratio
    >
      <Image
        src={nasaImageUrl}
        alt=" Image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoadingComplete={() => setNasaImageLoaded(true)}
        className="object-cover rounded-lg"
      />
      {!nasaImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );

  const aiImage = (
    <div
      key="ai"
      onClick={() => handleImageClick("ai")}
      className={`${imageContainerClass} ${
        selectedImage === "ai"
          ? "border-4 border-blue-500 transform scale-105"
          : selectedImage
          ? "opacity-50"
          : ""
      } border-2 border-white w-full md:w-1/2`} // Responsive sizing
      style={{ aspectRatio }} // Maintain aspect ratio
    >
      <Image
        src={aiImageUrl}
        alt=" Image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoadingComplete={() => setAiImageLoaded(true)}
        className="object-cover rounded-lg"
      />
      {!aiImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full gap-8 md:flex-row">
      {isNasaFirst ? nasaImage : aiImage}
      {isNasaFirst ? aiImage : nasaImage}
    </div>
  );
};

export default ImagePair;
