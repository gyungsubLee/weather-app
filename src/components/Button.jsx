import styled from "styled-components";

const Button = ({ onClick, children }) => {
  return <FancyButton onClick={onClick}>{children}</FancyButton>;
};

const FancyButton = styled.button`
  position: relative;
  overflow: hidden;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: transparent;
  z-index: 0;
  backdrop-filter: blur(6px);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(114, 237, 245, 0.6),
      rgba(178, 230, 255, 0.4)
    );
    z-index: -2;
    transition: opacity 0.3s ease;
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(178, 230, 255, 0.4),
      rgba(114, 237, 245, 0.6)
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover {
    font-size: 1.05rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(178, 230, 255, 0.4);
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 4px 10px rgba(81, 81, 229, 0.2);
  }
`;

export default Button;
