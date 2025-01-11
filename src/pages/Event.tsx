function Event() {
  const events = [
    { id: 1, name: 'Event 1', date: '2023-10-01' },
    { id: 2, name: 'Event 2', date: '2023-10-15' },
    { id: 3, name: 'Event 3', date: '2023-11-01' },
  ];

  return (
    <main>
      <h1>참여 가능한 행사를 확인하세요</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </main>
  );
}

export default Event;
