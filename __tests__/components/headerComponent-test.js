import 'react-native';
import React from 'react';
import HeaderComponent from '../../app/components/headerComponent';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <HeaderComponent/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
