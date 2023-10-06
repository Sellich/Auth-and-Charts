import React, { useState } from 'react';
import PieChartComponent from '../PieChartComponent/PieChartComponent';
import { COLORS } from '../../assets/constants';
import { ItemType } from '../../types/types';
import List from './List/List';
import './ChartWithList.css';

interface PieChartProps {
  data: ItemType[];
}

const ChartWithList: React.FC<PieChartProps> = ({ data }) => {
  const totalCount = data.reduce((accum, cur) => accum + cur.count, 0);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [activeItemCount, setActiveItemCount] = useState<number>(totalCount || 0);
  const [fillColors, setFillColors] = useState<string[]>(COLORS.INACTIVE);

  const setInactiveColors = () => setFillColors(COLORS.INACTIVE);
  const setActiveColors = () => setFillColors(COLORS.ACTIVE);

  const setActiveItem = (id: number | null, count: number, active = false, isListItem = false) => {
    // При наведении на элемент в списке еще добавляет подсветку диаграмме
    if (isListItem) {
      active ? setActiveColors() : setInactiveColors();
    }
    setActiveItemId(id);
    setActiveItemCount(count);
  };

  // Фиксит баг с сохранение стейта после onMouseLeave
  const resetState = () => {
    setActiveItemId(null);
    setActiveItemCount(totalCount || 0);
    setInactiveColors();
  };

  const setColorsProps = {
    setInactiveColors,
    setActiveColors,
  };

  const sameProps = {
    data,
    activeItemId,
    totalCount,
    setActiveItem,
  };

  return (
    <div className='block-wrapper' onMouseLeave={resetState}>
      <PieChartComponent fillColors={fillColors} activeItemCount={activeItemCount} {...sameProps} {...setColorsProps} />
      <List {...sameProps} />
    </div>
  );
};

export default ChartWithList;
