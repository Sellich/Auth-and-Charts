import React from 'react';
import { ItemType } from "../../types/types";

type ListItemProps = {
  item: ItemType,
  active: boolean,
  totalCount: number,
  setActiveItem: (id: number | null, count: number, active?: boolean, isListItem?: boolean) => void,
};

const ListItem: React.FC<ListItemProps> = ({ item, active, totalCount, setActiveItem }) => {
  const { name, count, id } = item;

  const handleMouseEnter = () => {
    setActiveItem(id, count, true, true);
  };

  const handleMouseLeave = () => {
    setActiveItem(null, totalCount, false, true);
  };

  const listItemClassName = `list-item ${active ? 'active' : ''}`;

  return (
    <li 
      className={listItemClassName} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <label>{name}:</label>
      <span>{count}</span>
    </li>
  );
};

export default ListItem;
