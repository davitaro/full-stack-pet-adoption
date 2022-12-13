import logo from "./weallneedSomeBunny.png";

const BigLogo = ({ width, height }) => {
  return (
    <img
      width={width}
      height={height}
      alt="somebunny"
      text=" We all need SomeBunny"
      src={logo}
    />
  );
};

export default BigLogo;
