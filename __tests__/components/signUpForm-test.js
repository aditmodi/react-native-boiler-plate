import 'react-native';
import React from 'react';
import SignUpForm from '../../app/components/signUpForm';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <SignUpForm/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
