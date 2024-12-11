
export const fetchRecommendations = async (preferences) => {
  const mockData = [
    { id: 1, name: 'Technology', icon: '🖥️' },
    { id: 2, name: 'Health', icon: '🧘' },
    { id: 3, name: 'Travel', icon: '✈️' },
  ];
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockData), 1000)
  );
};
