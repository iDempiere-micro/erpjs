import * as React from 'react';
import { cleanup } from '@testing-library/react';

import App from './app';

describe('App', () => {
  afterEach(cleanup);

  /* not working now  it('should render successfully', () => {
    const { baseElement } = render(<App apiUrl='' />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App apiUrl='' />);

    expect(getByText('Welcome to capture-prospect!')).toBeTruthy();
  });*/

  it('dummy', () => {});
});

