
import { slideContainer, titleStyle, subtitleStyle } from '../../styles/slideStyles';

const Slide1 = () => {
  return (
    <div style={slideContainer}>
      <h1 style={titleStyle}>
        Introduction to AI
      </h1>
      <p style={subtitleStyle}>
        A journey into the world of intelligent machines
      </p>
    </div>
  );
};

export default Slide1;
