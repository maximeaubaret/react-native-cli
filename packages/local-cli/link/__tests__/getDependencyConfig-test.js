/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @emails oncall+javascript_foundation
 */

'use strict';

const platforms = {
  ios: {
    dependencyConfig: () => ({ sampleiOSKey: '' }),
  },
  android: {
    dependencyConfig: () => ({ sampleAndroidKey: '' }),
  },
};

jest.setMock('../../core/getPackageConfiguration', (folder) => {
  if (folder === '/root/node_modules/abcd') {
    throw new Error('Cannot require');
  }
  return {};
});

const getDependencyConfig = require('../getDependencyConfig');

describe('getDependencyConfig', () => {
  it("should return an array of dependencies' config", () => {
    const dependencies = getDependencyConfig({ root: '/root' }, platforms, ['react-native-windows']);

    expect(dependencies).toMatchSnapshot();
  });

  it('should filter out invalid react-native projects', () => {
    const dependencies = getDependencyConfig(
      { root: '/root' },
      platforms,
      ['react-native-windows', 'abcd']
    );

    expect(dependencies).toMatchSnapshot();
  });
});
