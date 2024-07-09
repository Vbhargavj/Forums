import React from 'react';

export function ProfileInputField({ label, labelValue, color }) {
    if (color == 0) {
        return (
            <div className="flex  p-4">
                <div className="w-1/2 flex justify-between px-2">
                    <div>{label}</div>
                    <div>:</div>
                </div>
                <div className="w-1/2 px-2">
                    {labelValue}
                </div>
            </div>
        );
    }
    else {

        return (
            <div className="flex bg-stone-200 p-4">
                <div className="w-1/2 flex justify-between px-2">
                    <div>{label}</div>
                    <div>:</div>
                </div>
                <div className="w-1/2 px-2">
                    {labelValue}
                </div>
            </div>
        );
    }
}
