export async function getAllEvents() {
  // const response = await fetch('https://nextjs-newproj-default-rtdb.firebaseio.com/events.json')
  const response = await fetch('https://nextjs-newproj-66e0d-default-rtdb.firebaseio.com/events.json')
  const data = await response.json()

  const eventsToArr = [];

  for (const key in data) {
    eventsToArr.push({
      id: key,
      ...data[key]
    })
  }
  return eventsToArr;
}

export async function getSelectedEvents() {
  const allEventsArr = await getAllEvents()
  return allEventsArr.filter(event => event.isSelected === true)
}

export async function getEventById(id) {
  const allEventsArr = await getAllEvents()
  return allEventsArr.find((event) => event.id === id);
}

export async function getFilteredEvents(filteredDate) {
  const { year, month } = filteredDate;

  const allEventsArr = await getAllEvents()

  let filteredEvents = allEventsArr.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && 
      eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}