import { useCallback, useReducer } from 'react';
import type { CreatedMeetingDetailStateType } from '@/types/components';

export const ACTION_TYPES = {
  SET_INITIAL_DATA: 'SET_INITIAL_DETAIL_DATA',
  UPDATE_FIELD: 'UPDATE_FIELD',
  SELECT_FILED: 'SELECT_FILED',
  ADD_SCHEDULE_FIELD: 'ADD_SCHEDULE_FIELD',
  UPDATE_SCHEDULE_FIELD: 'UPDATE_SCHEDULE_FIELD',
  REMOVE_SCHEDULE_FIELD: 'REMOVE_SCHEDULE_FIELD',
};

interface SetInitialDataAction {
  type: typeof ACTION_TYPES.SET_INITIAL_DATA;
  payload: {
    selectionType: string | undefined;
    mode: string | undefined;
    minParticipants: number | undefined;
    maxParticipants: number | undefined;
    recruitingStartTime: string | undefined;
    recruitingEndTime: string | undefined;
    paymentAmount: number | undefined;
    info: string | undefined;
    schedules:
      | {
          content: string | number;
          address: string;
          addressDetail: string | undefined;
          meetingDate: string;
          meetingStartTime: string;
          meetingEndTime: string;
        }[]
      | undefined;
  };
}

interface UpdateFieldAction {
  type: typeof ACTION_TYPES.UPDATE_FIELD;
  payload: {
    field:
      | 'content'
      | 'minParticipants'
      | 'maxParticipants'
      | 'recruitingEndTime'
      | 'paymentAmount'
      | 'info';
    value: string | number;
    idx?: number | undefined;
  };
}

interface SelectFieldAction {
  type: typeof ACTION_TYPES.SELECT_FILED;
  payload: {
    field: 'selectionType' | 'mode';
    value: string;
  };
}

interface AddScheduleField {
  type: typeof ACTION_TYPES.ADD_SCHEDULE_FIELD;
  payload?: undefined;
}

interface RemoveScheduleField {
  type: typeof ACTION_TYPES.REMOVE_SCHEDULE_FIELD;
  payload: {
    idx: number;
  };
}

interface UpdateScheduleField {
  type: typeof ACTION_TYPES.UPDATE_SCHEDULE_FIELD;
  payload: {
    idx: number;
    field: 'meetingDate' | 'meetingStartTime' | 'meetingEndTime' | 'address';
    isField2: boolean;
    value: string;
    value2?: string;
  };
}

export type CreatedMeetingAction =
  | SetInitialDataAction
  | UpdateFieldAction
  | SelectFieldAction
  | AddScheduleField
  | RemoveScheduleField
  | UpdateScheduleField;

export default function useCreatedMeetingDetailDetailReducer() {
  const initialState = {
    selectionType: '',
    mode: '',
    minParticipants: 0,
    maxParticipants: 0,
    schedules: [
      {
        content: '',
        address: '',
        addressDetail: '',
        meetingDate: '',
        meetingStartTime: '',
        meetingEndTime: '',
      },
    ],
    recruitingStartTime: '',
    recruitingEndTime: '',
    paymentAmount: 0,
    info: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(
    state: CreatedMeetingDetailStateType['detail'],
    action: CreatedMeetingAction,
  ) {
    switch (action.type) {
      case ACTION_TYPES.SET_INITIAL_DATA: {
        const payload = action.payload as SetInitialDataAction['payload'];

        return {
          selectionType: payload.selectionType || '',
          mode: payload.mode || '',
          minParticipants: payload.minParticipants || 0,
          maxParticipants: payload.minParticipants || 0,
          recruitingStartTime: payload.recruitingStartTime || '',
          recruitingEndTime: payload.recruitingEndTime || '',
          paymentAmount: payload.paymentAmount || 0,
          info: payload.info || '',
          schedules: payload.schedules || [
            {
              content: '',
              address: '',
              addressDetail: '',
              meetingDate: '',
              meetingStartTime: '',
              meetingEndTime: '',
            },
          ],
        };
      }
      case ACTION_TYPES.UPDATE_FIELD: {
        const payload = action.payload as UpdateFieldAction['payload'];
        if (payload.field === 'content') {
          return {
            ...state,
            schedules: state.schedules.map((schedule, index) =>
              index === payload.idx
                ? { ...schedule, content: payload.value }
                : schedule,
            ),
          };
        } else {
          return {
            ...state,
            [payload.field]: payload.value,
          };
        }
      }
      case ACTION_TYPES.SELECT_FILED: {
        const payload = action.payload as SelectFieldAction['payload'];
        return {
          ...state,
          [payload.field]:
            state[payload.field] === payload.value ? '' : payload.value,
        };
      }
      case ACTION_TYPES.ADD_SCHEDULE_FIELD:
        return {
          ...state,
          schedules: [
            ...state.schedules,
            {
              content: '',
              address: '',
              addressDetail: '',
              meetingDate: '',
              meetingStartTime: '',
              meetingEndTime: '',
            },
          ],
        };
      case ACTION_TYPES.REMOVE_SCHEDULE_FIELD: {
        const payload = action.payload as RemoveScheduleField['payload'];
        return {
          ...state,
          schedules: state.schedules.filter(
            (_, index) => index !== payload.idx,
          ),
        };
      }
      case ACTION_TYPES.UPDATE_SCHEDULE_FIELD: {
        const payload = action.payload as UpdateScheduleField['payload'];
        return {
          ...state,
          schedules: state.schedules.map((schedule, index) =>
            index === payload.idx && !payload.isField2
              ? { ...schedule, [payload.field]: payload.value }
              : index === payload.idx && payload.isField2
                ? {
                    ...schedule,
                    [payload.field]: payload.value,
                    addressDetail: payload.value2,
                  }
                : schedule,
          ),
        };
      }
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  const updateData = useCallback(
    (
      selectionType?: string,
      mode?: string,
      minParticipants?: number,
      maxParticipants?: number,
      recruitingStartTime?: string,
      recruitingEndTime?: string,
      paymentAmount?: number,
      info?: string,
      schedules?: CreatedMeetingDetailStateType['detail']['schedules'],
    ) => {
      dispatch({
        type: ACTION_TYPES.SET_INITIAL_DATA,
        payload: {
          selectionType,
          mode,
          minParticipants,
          maxParticipants,
          recruitingStartTime,
          recruitingEndTime,
          paymentAmount,
          info,
          schedules,
        },
      });
    },
    [dispatch],
  );

  const updateField = (
    field:
      | 'content'
      | 'minParticipants'
      | 'maxParticipants'
      | 'recruitingEndTime'
      | 'paymentAmount'
      | 'info',
    value: string | number,
    idx?: number | undefined,
  ) =>
    dispatch({
      type: ACTION_TYPES.UPDATE_FIELD,
      payload: { field, value, idx },
    });

  const selectField = (field: 'selectionType' | 'mode', value: string) => {
    dispatch({
      type: ACTION_TYPES.SELECT_FILED,
      payload: { field, value },
    });
  };

  const addScheduleField = () =>
    dispatch({ type: ACTION_TYPES.ADD_SCHEDULE_FIELD });

  const removeScheduleField = (idx: number) =>
    dispatch({
      type: ACTION_TYPES.REMOVE_SCHEDULE_FIELD,
      payload: { idx },
    });

  const updateScheduleField = (
    idx: number,
    field: 'meetingDate' | 'meetingStartTime' | 'meetingEndTime' | 'address',
    isField2: boolean,
    value: string,
    value2?: string,
  ) =>
    dispatch({
      type: ACTION_TYPES.UPDATE_SCHEDULE_FIELD,
      payload: {
        idx,
        field,
        isField2,
        value,
        value2,
      },
    });

  return {
    state,
    updateData,
    updateField,
    selectField,
    addScheduleField,
    removeScheduleField,
    updateScheduleField,
  };
}
