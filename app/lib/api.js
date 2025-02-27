const API_BASE_URL = 'https://portals-gateway-748627113827.europe-west10.run.app/api/v2';

export async function fetchProjectData(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch project data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
} 