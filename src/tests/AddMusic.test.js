import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import AddMusic from './AddMusic'; // Adjust the import path based on your project structure

test('renders AddMusic component and handles form submission', async () => {
  render(<AddMusic />);

  // Fill in form fields
  fireEvent.change(screen.getByLabelText('Podcast Title'), { target: { value: 'Test Title' } });
  fireEvent.change(screen.getByLabelText('Podcast Description'), { target: { value: 'Test Description' } });
  fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'Test Author' } });
  fireEvent.change(screen.getByLabelText('Duration'), { target: { value: 'Test Duration' } });
  fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Test Category' } });

  // Simulate selecting an image file
  const imageFile = new File(['image content'], 'image.png', { type: 'image/png' });
  fireEvent.change(screen.getByLabelText('Image'), { target: { files: [imageFile] } });

  // Simulate selecting an audio file
  const audioFile = new File(['audio content'], 'audio.mp3', { type: 'audio/mp3' });
  fireEvent.change(screen.getByLabelText('Audio'), { target: { files: [audioFile] } });

  // Simulate form submission
  fireEvent.click(screen.getByText('Add a Podcast'));

  // Wait for the form submission and any API calls to complete
  await waitFor(() => {
    expect(screen.getByText('Podcast Created Successfully')).toBeInTheDocument();
  });

  // You can add more assertions here to check if the component behaves as expected
});
