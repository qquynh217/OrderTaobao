import { Button, Form, FormInstance, Image, Spin, Upload } from "antd";
import { FC, useState } from "react";
import { PiUploadSimpleBold } from "react-icons/pi";

const ImageUploader: FC<{
  form: FormInstance<any>;
  name?: string;
  label?: string;
}> = ({ form, name = "image", label }) => {
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Xử lý khi người dùng nhập link ảnh
  // const handleUrlChange = (e: any) => {
  //   const url = e.target.value;
  //   form.setFieldValue("image", url);
  //   setImageUrl(url);
  //   setPreview(url);
  // };

  // Xử lý khi người dùng upload file
  const handleFileChange = (value: any) => {
    const file = value.file;

    if (file?.status == "uploading") {
      setLoading(true);
      setPreview(null);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); // Tạo preview từ file
        form.setFieldValue(name, file.originFileObj);
      };
      reader.readAsDataURL(file.originFileObj);
      setLoading(false);
    }
  };
  const customRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="image-uploader">
      <div className="input-field">
        {/* <Input
          type="text"
          placeholder="Nhập link ảnh"
          value={imageUrl}
          onChange={handleUrlChange}
          style={{ width: "100%" }}
        /> */}

        <Form.Item
          name={name}
          label={label}
          onReset={() => {
            setPreview(null);
          }}
        >
          <Upload
            name="file"
            customRequest={customRequest}
            onChange={handleFileChange}
            accept="image/*"
            showUploadList={false}
            maxCount={1}
          >
            <Button icon={<PiUploadSimpleBold />}>Upload</Button>
          </Upload>
        </Form.Item>
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
        {loading && (
          <div className="loading">
            <Spin />
            <p>Uploading</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
