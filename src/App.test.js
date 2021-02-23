import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders wthout crashing', async () => {
  const { findByText } = await render(<App />);
  const id = findByText(/Última búsqueda/i);
  expect(id).toBeInTheDocument();
});
