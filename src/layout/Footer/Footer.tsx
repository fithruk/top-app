import { FooterProps } from "./Footer.props";

const Footer = ({ children, ...props }: FooterProps): JSX.Element => {
  return <footer {...props}>{children}</footer>;
};

export default Footer;
