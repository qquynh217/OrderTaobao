import { FormInstance, Image, Input } from "antd";
import { FC, useState } from "react";
import { PiUploadSimpleBold } from "react-icons/pi";

const ImageUploader: FC<{ form: FormInstance<any> }> = ({ form }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState<any>(null);

  // Xử lý khi người dùng nhập link ảnh
  const handleUrlChange = (e: any) => {
    const url = e.target.value;
    form.setFieldValue("image", url);
    setImageUrl(url);
    setPreview(url);
  };

  // Xử lý khi người dùng upload file
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); // Tạo preview từ file
        form.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <div className="input-field">
        <Input
          type="text"
          placeholder="Nhập link ảnh"
          value={imageUrl}
          onChange={handleUrlChange}
          style={{ width: "100%" }}
        />
        <label htmlFor="uploader">
          <div className="upload-btn">
            <PiUploadSimpleBold />
            Upload
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: "10px", display: "none" }}
          name="uploader"
          id="uploader"
        />
      </div>

      <div className="image-preview">
        {preview && (
          <Image
            src={preview}
            alt="preview"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              borderRadius: "8px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
