import React from 'react';

interface FormSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    unit: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormSlider: React.FC<FormSliderProps> = ({ label, value, min, max, unit, onChange }) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <label className="text-base font-bold text-gray-700">{label}</label>
                <span className="text-lg font-bold text-emerald-600">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
        </div>
    );
};

export default FormSlider;