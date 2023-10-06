import TotalItem from '../../ListItem/TotalItem'
import ListItem from '../../ListItem/ListItem'
import { ItemType } from '../../../types/types'
import './List.css';

type ListProps = {
  data: ItemType[],
  activeItemId: number | null,
  totalCount: number,
  setActiveItem: (id: number | null, count: number, active?: boolean, isListItem?: boolean) => void,
}

const List = ({data, totalCount, activeItemId, setActiveItem}: ListProps) => {
  return (
    <div className='list-container'>
      <ul className='list'>
        {/* Решил вынести элемент "Всего" в отдельный компонент и убрать его из .map */}
        <TotalItem totalCount={totalCount} activeItemId={activeItemId} setActiveItem={setActiveItem} />
        {data.map((item) => (
          <ListItem
            item={item}
            key={item.id}
            active={item.id === activeItemId}
            setActiveItem={setActiveItem}
            totalCount={totalCount}
          />
        ))}
      </ul>
    </div>
  )
}

export default List