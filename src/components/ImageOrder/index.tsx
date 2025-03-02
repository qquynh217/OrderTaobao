import { FC, useEffect, useState } from "react";
import { orderService } from "services/order";
import empty from "resources/images/no-image-product.png";

const ImageOrder: FC<{ image_id: string; order_id: string }> = ({
  image_id,
  order_id,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await orderService.getImage({
          image_id,
          order_id,
        });

        if (response.status != 200) {
          throw new Error("Failed to fetch image");
        }

        // const blob = await response.blob();
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const objectURL = URL.createObjectURL(blob);

        setImageSrc(objectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (image_id) fetchImage();
  }, [image_id]);
  return <img src={imageSrc ? imageSrc : empty} alt="" className="order-img" />;
};
export default ImageOrder;
