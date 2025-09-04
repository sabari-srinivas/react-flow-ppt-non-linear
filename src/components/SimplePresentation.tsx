import { useStore } from '../store';

import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';
import Slide16 from './slides/Slide16';
import Slide17 from './slides/Slide17';
import Slide18 from './slides/Slide18';
import Slide19 from './slides/Slide19';
import Slide20 from './slides/Slide20';

const slides = [
  { id: '1', component: <Slide1 /> },
  { id: '2', component: <Slide2 /> },
  { id: '3', component: <Slide3 /> },
  { id: '4', component: <Slide4 /> },
  { id: '5', component: <Slide5 /> },
  { id: '6', component: <Slide6 /> },
  { id: '7', component: <Slide7 /> },
  { id: '8', component: <Slide8 /> },
  { id: '9', component: <Slide9 /> },
  { id: '10', component: <Slide10 /> },
  { id: '11', component: <Slide11 /> },
  { id: '12', component: <Slide12 /> },
  { id: '13', component: <Slide13 /> },
  { id: '14', component: <Slide14 /> },
  { id: '15', component: <Slide15 /> },
  { id: '16', component: <Slide16 /> },
  { id: '17', component: <Slide17 /> },
  { id: '18', component: <Slide18 /> },
  { id: '19', component: <Slide19 /> },
  { id: '20', component: <Slide20 /> },
];

const buttonStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: '1rem',
  margin: '0 5px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
};

const SimplePresentation = () => {
  const { currentSlide, actions } = useStore();
  const { next, prev } = actions;
  const currentSlideData = slides.find(slide => slide.id === currentSlide) || slides[0];

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ 
        flex: 1, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '20px'
      }}>
        {currentSlideData.component}
      </div>

      <div style={{ 
        position: 'fixed', 
        bottom: 20, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        gap: '20px',
        alignItems: 'center'
      }}>
        <button 
          onClick={prev} 
          style={{
            ...buttonStyle, 
            opacity: currentSlide === '1' ? 0.5 : 1,
            cursor: currentSlide === '1' ? 'not-allowed' : 'pointer'
          }}
          disabled={currentSlide === '1'}
        >
          Previous
        </button>

        <div style={{ 
          color: '#2c3e50',
          fontWeight: 'bold',
          minWidth: '100px',
          textAlign: 'center'
        }}>
          Slide {slides.findIndex(s => s.id === currentSlide) + 1} of {slides.length}
        </div>

        <button 
          onClick={next} 
          style={{
            ...buttonStyle, 
            opacity: currentSlide === slides[slides.length - 1].id ? 0.5 : 1,
            cursor: currentSlide === slides[slides.length - 1].id ? 'not-allowed' : 'pointer'
          }}
          disabled={currentSlide === slides[slides.length - 1].id}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SimplePresentation;





