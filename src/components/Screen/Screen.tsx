import { ReactNode, MouseEventHandler } from "react";

const Screen = ({
  id,
  children,
  backgroundColor,
  onPress,
}: {
  id: string;
  children: ReactNode;
  backgroundColor: string;
  onPress: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      id={id}
      style={{
        margin: 0,
        padding: "1rem",
        textAlign: 'center',
        backgroundColor: backgroundColor,
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onPress}
    >
      {children}
    </div>
  );
};

export default Screen;
