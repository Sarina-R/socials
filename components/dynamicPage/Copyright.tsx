interface CopyrightProps {
  primaryColor: string;
  text: string;
}

const Copyright = ({ primaryColor, text }: CopyrightProps) => {
  return (
    <div
      style={{ background: primaryColor }}
      className="text-white items-center p-5 text-sm"
    >
      {text}
    </div>
  );
};

export default Copyright;
