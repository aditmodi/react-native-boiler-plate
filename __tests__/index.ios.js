import 'react-native';
import React from 'react';
import Index from '../index.ios.js';
// import mockRNFS from '../__mocks__/mockRNFS';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// jest.mock('react-native-fs', () => mockRNFS);
it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});
