import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import Slider from '@mui/material/Slider';


const Controls = ({
  currentStage,
  stageIndex,
  uniqueStagesLength,
  setStageIndex,
  isPlaying,
  setIsPlaying,
  innerWidth,    // New prop for the plot's inner width
  marginLeft,    // New prop for the left margin
  uniqueScaling,       // Prop: all available scaling categories
  selectedScalings,    // Prop: scaling categories currently toggled on
  setSelectedScalings, // Prop: function to update the selected scalings
  colorScale
}) => {
    // Toggle a scaling category on/off
    const handleCheckboxChange = (scaling) => {
      if (selectedScalings.includes(scaling)) {
        setSelectedScalings(selectedScalings.filter(item => item !== scaling));
      } else {
        setSelectedScalings([...selectedScalings, scaling]);
      }
    };

  // Calculate tick spacing as a percentage of the slider width.
  const tickSpacing = uniqueStagesLength > 1 ? 100 / (uniqueStagesLength - 1) : 0;
  // Create marks for the slider. If you want to include labels,
  // you can modify the objects below. For now, we simply create tick marks.
  const marks = Array.from({ length: uniqueStagesLength }, (_, i) => ({
    value: i,
    label: '' // or add a label if available (e.g., uniqueStages[i])
  }));

  return (
  <div style={{ width: innerWidth, marginLeft: `${marginLeft}px`, textAlign: 'center' }}>
      

    <div className="flex items-center ">

      {/* Play/Pause toggle Button */}
      <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="mr-2 px-4 py-2 rounded"
          style={{ transform: 'scale(1.5)' }}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

      {/* Slider */}

        {/* MUI Discrete Slider */}
        <Slider
  value={stageIndex}
  onChange={(event, newValue) => setStageIndex(newValue)}
  min={0}
  max={uniqueStagesLength - 1}
  step={1}
  marks={marks}
  valueLabelDisplay="auto"
  className="flex-grow mx-4"
  sx={{
    color: '#888', // This sets the color of the track and thumb by default
    '& .MuiSlider-thumb': {
      backgroundColor: '#3e3c38',
      boxShadow: 'none',  // Remove default box shadow
      '&:hover': {
        boxShadow: 'none',
      },
      '&.Mui-active': {
        boxShadow: 'none',
      },
      '&.Mui-focusVisible': {
        boxShadow: 'none',
      },
    },
    '& .MuiSlider-track': {
      backgroundColor: '#3e3c38',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#3e3c38',
    },
    '& .MuiSlider-markLabel': {
      color: '#3e3c38',
    }
  }}
/>
    </div>

        {/* Current stage text */}
        <label className="w-44">{currentStage}</label>

      {/* Scaling factors toggled as buttons */}
      <fieldset style={{ marginBottom: '1rem', border: 'none' }}>
        <legend style={{ marginBottom: '0.5rem' }}>Scaling factors</legend>
        {uniqueScaling.map((scaling) => {
          const isChecked = selectedScalings.includes(scaling);
          const currentColor = colorScale(scaling);
          return (
            <button
              key={scaling}
              onClick={() => handleCheckboxChange(scaling)}
              className="mr-2 px-4 py-2 rounded-xl transition duration-200 focus:outline-none"
              style={{
                backgroundColor: isChecked ? currentColor : 'white',
                color: isChecked ? 'white' : currentColor,
                border: `2px solid ${currentColor}`
              }}
            >
              {scaling}
            </button>
          );
        })}
      </fieldset>
</div>
  );
};

export default Controls;