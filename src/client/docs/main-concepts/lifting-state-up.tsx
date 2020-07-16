import React from 'react';

/**
 * Notes:
 * - Single source of truth
 * - Rely on top down data flow instead of trying to sync the state between components
 * - Requires more boilerplate, but easy to find bugs as only one component owns and updates the
 * state: "surface area" for bugs is reduced
 * - Anything which can be derived (from props or some field in state) should not be in state. As
 * an example, here we derive value of other scale without loosing (precision etc) of user input
 * data
 */

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

function toFahrenheit(fahrenheitDegree: number) {
  return (fahrenheitDegree * 9) / 5 + 32;
}

function toCelsius(celsiusDegree: number) {
  return ((celsiusDegree - 32) * 5) / 9;
}

function tryConvert(degreeString: string, convert: (_: number) => number) {
  const degree = parseFloat(degreeString);
  if (Number.isNaN(degree)) {
    return '';
  }

  // Convert to 3 decimal places and return as string
  return (Math.round(convert(degree) * 1000) / 1000).toString();
}

function BoilingVerdict(props: { degree: number; scale: string }) {
  const { degree, scale } = props;
  const boilingPoint = scale === 'c' ? 100 : 212;
  if (degree >= boilingPoint) {
    return <p>Water should boil</p>;
  }
  return <p>Water should not boil</p>;
}

interface TemperatureInputProps {
  scale: string;
  temperature: string;
  onTemperatureChange: (degree: string, scale: string) => void;
}

const TemperatureInput = (props: TemperatureInputProps) => {
  const { onTemperatureChange, temperature, scale } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onTemperatureChange(e.target.value, scale);
  };
  return (
    <fieldset>
      <legend>{`Enter temperature in ${scaleNames[scale]}:`}</legend>
      <input value={temperature} onChange={handleChange}></input>
      <BoilingVerdict degree={parseFloat(temperature)} scale={scale} />
    </fieldset>
  );
};

class Calculator extends React.Component<{}, { degree: string; scale: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { degree: '', scale: 'c' };
    this.onTemperatureChange = this.onTemperatureChange.bind(this);
  }

  onTemperatureChange(degree: string, scale: string) {
    this.setState({ degree, scale });
  }

  render() {
    const { degree, scale } = this.state;
    const celsius = scale === 'c' ? degree : tryConvert(degree, toCelsius);
    const fahrenheit = scale === 'f' ? degree : tryConvert(degree, toFahrenheit);
    return (
      <>
        <TemperatureInput
          scale="c"
          onTemperatureChange={this.onTemperatureChange}
          temperature={celsius}
        />
        <TemperatureInput
          scale="f"
          onTemperatureChange={this.onTemperatureChange}
          temperature={fahrenheit}
        />
      </>
    );
  }
}

function LiftingStateUp() {
  return (
    <>
      <h1>React Docs: Main Concepts : Lifting State Up</h1>
      <Calculator />
    </>
  );
}

export default {
  url: 'lifting-state-up',
  name: 'Lifting State Up',
  Component: LiftingStateUp,
};
