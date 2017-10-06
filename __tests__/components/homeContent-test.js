import 'react-native';
import React from 'react';
import HomeContent from '../../app/components/homeContent';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <HomeContent/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
