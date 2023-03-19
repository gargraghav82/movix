import React, { useState } from 'react'
import './style.scss';

const TabSwitch = ({data , onTabChange}) => {

    const [left , setLeft] = useState(0);
    const [selected , setSelected] = useState(0);

    const selectTab = (index , tab) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelected(index)
        } , 300);
        onTabChange(tab);
    }

  return (
    <div className="switchingTabs">
        <div className="tabItems">
            {
                data.map((tab , index) => (
                    <span
                        key={index}
                        className={`tabItem ${(selected === index) ? 'active' : ''}`}
                        onClick={() => selectTab(index , tab)}
                    >
                        {tab}
                    </span>
                ))
            }

            <span className="movingBg" style={{ left }} />
        </div>
    </div>
  );
}

export default TabSwitch