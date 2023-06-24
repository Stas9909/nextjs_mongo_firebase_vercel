const TEMPORARY_DATA = [
  {
    id: 'id1',
    title: 'Event 1',
    description: 'This is event 1',
    location: 'Musee du Louvre, 75058, Paris - France',
    date: '2022-05-01',
    image: 'images/coding-event.jpg',
    isSelected: false,
  },
  {
    id: 'id2',
    title: 'Event 2',
    description: 'This is event 2',
    location: 'Pruneridge Ave, Santa Clara, CA 95050, USA',
    date: '2022-05-02',
    image: 'images/introvert-event.jpg',
    isSelected: true,
  },
  {
    id: 'id3', 
    title: 'Event 3',
    description: 'This is event 3',
    location: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
    date: '2023-05-03',
    image: 'images/extrovert-event.jpg',
    isSelected: true,
  }  
];

export function getSelectedEvents() {
  return TEMPORARY_DATA.filter((event) => event.isSelected);
}

export function getEventById(id) {//id мы получаем из [eventId].js
  return TEMPORARY_DATA.find((event) => event.id === id);
}

export function getAllEvents() {
  return TEMPORARY_DATA;
}

export function getFilteredEvents(filteredDate) {//{ year: 2021, month: 11 }
  const { year, month } = filteredDate;

  let filteredEvents = TEMPORARY_DATA.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && 
      eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}