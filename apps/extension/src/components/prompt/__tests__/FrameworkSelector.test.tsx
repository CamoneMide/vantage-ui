import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  describe, expect, it, vi,
} from 'vitest';

import { FrameworkSelector } from '../framework-selector';

describe('FrameworkSelector', () => {
  it('renders all three segments', () => {
    render(<FrameworkSelector value="shadcn" onChange={() => {}} />);
    expect(screen.getByText('React / Shadcn')).toBeDefined();
    expect(screen.getByText('React / Tailwind')).toBeDefined();
    expect(screen.getByText('Raw HTML')).toBeDefined();
  });

  it('highlights the active segment with selected styling', () => {
    render(<FrameworkSelector value="tailwind" onChange={() => {}} />);
    const activeButton = screen.getByText('React / Tailwind');
    expect(activeButton.style.color).toBe('rgb(5, 59, 132)');
    expect(activeButton.style.background).toBe('rgb(255, 255, 255)');
    expect(activeButton.style.boxShadow).toBeTruthy();
  });

  it('calls onChange with the correct value when a segment is clicked', () => {
    const handleChange = vi.fn();
    render(<FrameworkSelector value="shadcn" onChange={handleChange} />);

    fireEvent.click(screen.getByText('Raw HTML'));
    expect(handleChange).toHaveBeenCalledWith('html');
  });

  it('calls onChange when the already active segment is clicked', () => {
    const handleChange = vi.fn();
    render(<FrameworkSelector value="shadcn" onChange={handleChange} />);

    fireEvent.click(screen.getByText('React / Shadcn'));
    expect(handleChange).toHaveBeenCalledWith('shadcn');
  });

  it('is a controlled component — changing value externally updates styling', () => {
    const { rerender } = render(
      <FrameworkSelector value="shadcn" onChange={() => {}} />,
    );

    expect(screen.getByText('React / Shadcn').style.color).toBe(
      'rgb(5, 59, 132)',
    );

    rerender(<FrameworkSelector value="html" onChange={() => {}} />);

    expect(screen.getByText('React / Shadcn').style.color).toBe(
      'rgba(10, 10, 10, 0.6)',
    );
    expect(screen.getByText('Raw HTML').style.color).toBe('rgb(5, 59, 132)');
  });
});
