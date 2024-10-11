import { ReactNode } from "react";
interface ButtonProps {
  text: JSX.Element | string;
  classNameContainer?: string;
  classNameText?: string;
  style?: any;
  icon?: ReactNode;
  handleClick?: () => void;
}

const ButtonIcon: React.FC<ButtonProps> = ({
  text,
  classNameContainer = "",
  classNameText = "",
  handleClick,
  icon,
}) => {
  return (
    <div className={classNameContainer} onClick={handleClick}>
      {icon}
      <p className={classNameText}>{text}</p>
    </div>
  );
};

export default ButtonIcon;
