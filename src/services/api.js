const API_BASE = '/api';   // This works because of the proxy

export const scanProduct = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE}/scan`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to scan product');
  }

  return response.json();
};