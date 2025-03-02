import { NumericFormat } from "react-number-format";

const NumberFormat = ({
  value,
  decimalScale = 2,
  suffix,
  emptyText = "",
}: {
  value: any;
  decimalScale?: number;
  suffix?: string;
  emptyText?: string;
}) => {
  return !isNaN(parseFloat(value)) && isFinite(value) ? (
    <NumericFormat
      thousandSeparator
      displayType="text"
      decimalScale={decimalScale}
      value={value}
      suffix={suffix ? " " + suffix : undefined}
    />
  ) : (
    emptyText
  );
};

export default NumberFormat;
