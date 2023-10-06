import ListItem from './ListItem'

type TotalItemProps = {
  activeItemId: number | null,
  totalCount: number,
  setActiveItem: (id: number | null, count: number, active?: boolean, isListItem?: boolean) => void,
}

const TotalItem = ({ totalCount, activeItemId, setActiveItem}: TotalItemProps) => {
  const item = {
    name: 'Всего',
    count: totalCount,
    id: 0
  }

  return (
    <ListItem
      item={item} key={item.id}
      active={item.id === activeItemId}
      setActiveItem={setActiveItem}
      totalCount={totalCount}
    />
  )
}

export default TotalItem
