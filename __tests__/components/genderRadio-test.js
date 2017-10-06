import 'react-native';
import React from 'react';
import GenderRadio from '../../app/components/genderRadio';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <GenderRadio/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
