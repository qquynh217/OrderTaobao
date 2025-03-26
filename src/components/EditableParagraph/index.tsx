import { Input, Tooltip, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";

const { Paragraph } = Typography;

const EditableParagraph: FC<{
  initvalue?: string | number;
  tooltip?: string;
  handleUpdate?: any;
  field?: string;
}> = ({ initvalue, tooltip, handleUpdate, field }) => {
  const [text, setText] = useState(initvalue ?? "");
  const [editing, setEditing] = useState(false);

  const handlePressEnter = (e: any) => {
    setText(e.target.value); // Lấy giá trị mới
    setEditing(false); // Thoát khỏi chế độ chỉnh sửa
    console.log("Nội dung sau khi sửa:", e.target.value);
    if (handleUpdate && field) {
      handleUpdate(e.target.value, field);
    }
  };
  useEffect(() => {
    setText(initvalue ?? "");
  }, [initvalue]);
  return (
    <div className="editable-paragraph">
      {editing ? (
        <Input
          defaultValue={text}
          onPressEnter={handlePressEnter}
          onBlur={() => setEditing(false)} // Thoát khi click ra ngoài
          autoFocus
          suffix="đ"
        />
      ) : (
        <div
          className="d-flex-center"
          onClick={() => {
            setEditing(true);
          }}
        >
          <Paragraph
            onClick={() => setEditing(true)}
            style={{ margin: 0, marginRight: 5 }}
          >
            {text}
          </Paragraph>
          <Tooltip title={tooltip}>
            <RiEdit2Fill fontSize={16} />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default EditableParagraph;
