import 'react-native';
import React from 'react';
import InputField from '../../app/components/input';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <InputField/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
