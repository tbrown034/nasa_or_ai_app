// app/play/components/ImagePair.js
import Image from "next/image";

const ImagePair = ({
  nasaImageUrl,
  aiImageUrl,
  isNasaFirst,
  selectedImage,
  handleImageClick,
}) => {
  const imageClass = "object-cover w-full h-full rounded-lg";
  const selectedClass = "border-4 border-blue-500 transform scale-105";
  const unselectedClass =
    selectedImage === "nasa" || selectedImage === "ai" ? "opacity-50" : "";

  const nasaImage = (
    <div
      key="nasa"
      onClick={() => handleImageClick("nasa")}
      className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
        selectedImage === "nasa" ? selectedClass : unselectedClass
      }`}
      style={{ width: "400px", height: "400px" }}
    >
      <Image
        src={nasaImageUrl}
        alt="Guess AI or NASA Image"
        layout="fill"
        objectFit="cover"
        className={imageClass}
      />
      {selectedImage === "nasa" && (
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-black bg-opacity-50">
          Selected
        </div>
      )}
    </div>
  );

  const aiImage = (
    <div
      key="ai"
      onClick={() => handleImageClick("ai")}
      className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
        selectedImage === "ai" ? selectedClass : unselectedClass
      }`}
      style={{ width: "400px", height: "400px" }}
    >
      <Image
        src={aiImageUrl}
        alt="Guess AI or NASA Image"
        layout="fill"
        objectFit="cover"
        className={imageClass}
      />
      {selectedImage === "ai" && (
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-black bg-opacity-50">
          Selected
        </div>
      )}
    </div>
  );

  return isNasaFirst ? [nasaImage, aiImage] : [aiImage, nasaImage];
};

export default ImagePair;
