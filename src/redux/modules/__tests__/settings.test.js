/* @flow */

import AsyncStorage from '@react-native-community/async-storage';

import reducer, {
  DEFAULT_UNIT_SYSTEM,
  EDIT_SETS_SCREEN_TYPE,
  INIT_SETTINGS,
  initialState,
  setEditSetsScreenType,
} from '../settings';
import { Settings } from '../../../utils/constants';

describe('EDIT_SETS_SCREEN_TYPE', () => {
  it('calls AsyncStorage when switching editSetsScreenType', async () => {
    const dispatch = jest.fn();
    setEditSetsScreenType('paper')(dispatch);

    expect(AsyncStorage.setItem).toBeCalledWith(
      Settings.editSetsScreen,
      'paper'
    );
  });

  it('handles INIT_SETTINGS', async () => {
    const payload = {
      editSetsScreenType: 'paper',
      defaultUnitSystem: 'imperial',
      firstDayOfTheWeek: 'monday',
    };
    const newState = reducer(initialState, {
      type: INIT_SETTINGS,
      payload,
    });

    expect(newState).toEqual(payload);
  });

  it('handles EDIT_SETS_SCREEN_TYPE', async () => {
    const newState = reducer(initialState, {
      type: EDIT_SETS_SCREEN_TYPE,
      payload: 'paper',
    });

    expect(newState).toEqual({
      defaultUnitSystem: 'metric',
      editSetsScreenType: 'paper',
      firstDayOfTheWeek: 'monday',
    });
  });

  it('handles DEFAULT_UNIT_SYSTEM_TYPE', async () => {
    const newState = reducer(initialState, {
      type: DEFAULT_UNIT_SYSTEM,
      payload: 'imperial',
    });

    expect(newState).toEqual({
      defaultUnitSystem: 'imperial',
      editSetsScreenType: 'list',
      firstDayOfTheWeek: 'monday',
    });
  });
});