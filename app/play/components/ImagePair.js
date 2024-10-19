// components/ImagePair.js
import Image from "next/image";

const ImagePair = ({
  nasaImageUrl,
  aiImageUrl,
  isNasaFirst,
  selectedImage,
  handleImageClick,
}) => {
  const imageClass = "object-cover w-full h-auto rounded-lg";
  const selectedClass = "border-4 border-blue-500 transform scale-105";
  const defaultClass = "border-2 border-white";
  const unselectedClass = selectedImage ? "opacity-50" : "";

  const imageContainerClass =
    "relative cursor-pointer transition-transform duration-300 ease-in-out";

  const nasaImage = (
    <div
      key="nasa"
      onClick={() => handleImageClick("nasa")}
      className={`${imageContainerClass} ${
        selectedImage === "nasa" ? selectedClass : unselectedClass
      } ${defaultClass} w-full md:w-1/2`} // Responsive sizing
    >
      <Image
        src={nasaImageUrl}
        alt="NASA Image"
        layout="responsive"
        width={400}
        height={400}
        objectFit="cover"
        className={imageClass}
      />
      {selectedImage === "nasa" && (
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
          Selected
        </div>
      )}
    </div>
  );

  const aiImage = (
    <div
      key="ai"
      onClick={() => handleImageClick("ai")}
      className={`${imageContainerClass} ${
        selectedImage === "ai" ? selectedClass : unselectedClass
      } ${defaultClass} w-full md:w-1/2`} // Responsive sizing
    >
      <Image
        src={aiImageUrl}
        alt="AI Image"
        layout="responsive"
        width={400}
        height={400}
        objectFit="cover"
        className={imageClass}
      />
      {selectedImage === "ai" && (
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white ">
          Selected
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full gap-4 md:flex-row">
      {isNasaFirst ? nasaImage : aiImage}
      {isNasaFirst ? aiImage : nasaImage}
    </div>
  );
};

export default ImagePair;
