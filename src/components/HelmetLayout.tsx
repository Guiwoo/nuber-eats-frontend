import {Helmet} from "react-helmet-async";

type LayoutProps = {
  title: string;
};

export const HelmetLayout: React.FC<LayoutProps> = ({title}) => {
  return (
    <Helmet>
      <title>{title} | Nuber Eats</title>
    </Helmet>
  );
};
