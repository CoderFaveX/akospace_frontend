import { Link } from "react-scroll";

const Scroll = ({
  to,
  smooth,
  duration,
  content,
  className = null,
  onClick,
}: {
  to: string;
  smooth: boolean;
  duration: number;
  content: React.ReactNode;
  className: string | null;
  onClick?: () => void;
}) => {
  return (
    <Link to={to} smooth={smooth} onClick={onClick} duration={duration} className={className ?? ""}>
      {content}
    </Link>
  );
};

export default Scroll;
