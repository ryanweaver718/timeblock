export const getItemColor = (isDragging, isHovering, priority) => {
  const priorityColors = {
    1: 'red',
    2: 'orange',
    3: 'yellow',
    4: 'green',
  };
  const priorityHovering = {
    1: 'lightred',
    2: 'lightorange',
    3: 'lightyellow',
    4: 'lightgreen',
  };
  if (isDragging) return 'lightgreen';
  else if (!priority) return 'pink';
  else if (isHovering) return priorityHovering[priority];
  else return priorityColors[priority];
};
