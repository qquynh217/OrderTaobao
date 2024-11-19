import { NumericFormat } from "react-number-format";

const NumberFormat = ({
  value,
  decimalScale = 2,
  suffix,
}: {
  value: any;
  decimalScale?: number;
  suffix?: string;
}) => {
  return (
    <NumericFormat
      thousandSeparator
      displayType="text"
      decimalScale={decimalScale}
      value={value}
      suffix={suffix ? " " + suffix : undefined}
    />
  );
};

export default NumberFormat;
