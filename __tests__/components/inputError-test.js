import 'react-native';
import React from 'react';
import InputError from '../../app/components/inputError';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <InputError/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
