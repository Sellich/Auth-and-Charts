import { Cell, Label, Pie, PieChart } from 'recharts';
import { ItemType } from '../../types/types';
import { ACTIVE_BOARD_COLOR } from '../../assets/constants';

interface PieChartProps {
  data: ItemType[],
  activeItemId: number | null,
  activeItemCount: number,
  fillColors: string[],
  totalCount: number,
  setInactiveColors: () => void,
  setActiveColors: () => void,
  setActiveItem: (id: number | null, count: number, active?: boolean, isListItem?: boolean) => void,
}

const PieChartComponent = ({ data, setActiveItem, setInactiveColors, setActiveColors, totalCount, activeItemId, activeItemCount, fillColors }: PieChartProps) => {

  const handleOut = () => {
    setActiveItem(null, totalCount)
  }

  const handleMove = (count: number, id: number | null) => {
    setActiveItem(id, count)
  }

  const cells = data.map((item, index) => {
    const fillColor = item.id === activeItemId ? ACTIVE_BOARD_COLOR : fillColors[index % fillColors.length];

    return (
      <Cell
        key={`cell-${index}`}
        fill={fillColor}
        onMouseLeave={handleOut}
        onMouseEnter={() => handleMove(item.count, item.id)}
      />
    )
  })
  // Для экономии времени и возможости дальнейшего масштабирования графиков, решил использовать библиотечку recharts.
  return (
    <PieChart width={200} height={200} onMouseEnter={setActiveColors} onMouseLeave={setInactiveColors}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        innerRadius={70}
        outerRadius={80}
        paddingAngle={-5}
        cornerRadius={10}
        dataKey="count"
      >
        <Label
          value={activeItemCount} position="centerBottom" className='label-top' fontSize='27px'
        />
        <Label
          value="Всего" position="centerTop" className='label-top' fontSize='27px'
        />
        {cells}
      </Pie>
    </PieChart>
  )
}

export default PieChartComponent