import 'react-native';
import React from 'react';
import Menu from '../../app/components/sideBar';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <Menu/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
