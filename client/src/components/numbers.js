import AnimatedNumbers from 'react-animated-numbers';
        
const Numbers = ({ value }) => {
  return (
   <AnimatedNumbers
      animateToNumber={value}
      fontStyle={{ fontSize: 80, fontWeight: 'bold', color: '#E7C0BC' }}
      configs={[
        { mass: 1, tension: 220, friction: 100 },
      ] }
    />
  );
};

export default Numbers
