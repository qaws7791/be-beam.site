import { useCallback, useReducer } from 'react';
import type { CreatedMeetingDetailStateType } from '@/types/components';

export const ACTION_TYPES = {
  SET_INITIAL_DATA: 'SET_INITIAL_DATA',
  UPDATE_THUMBNAIL: 'UPDATE_THUMBNAIL',
  UPDATE_FIELD: 'UPDATE_FIELD',
  ADD_TOPIC: 'ADD_TOPIC',
  ADD_HASHTAG: 'ADD_HASHTAG',
  REMOVE_HASHTAG: 'REMOVE_HASHTAG',
  ADD_IMAGES: 'ADD_IMAGES',
  REMOVE_IMAGE: 'REMOVE_IMAGE',
};

interface SetInitialDataAction {
  type: typeof ACTION_TYPES.SET_INITIAL_DATA;
  payload: {
    thumbnailImage: string;
    name: string;
    introduction: string;
    totalImages: string[];
    existingImages: string[];
    topic: string;
    hashtags: string[];
    hostDescription: string;
  };
}

interface UpdateThumbnailAction {
  type: typeof ACTION_TYPES.UPDATE_THUMBNAIL;
  payload: { value: File | null; previewValue: string };
}

interface UpdateFieldAction {
  type: typeof ACTION_TYPES.UPDATE_FIELD;
  payload: {
    field: 'name' | 'introduction' | 'hostDescription';
    value: string;
  };
}

interface AddTopicAction {
  type: typeof ACTION_TYPES.ADD_TOPIC;
  payload: { topic: string };
}

interface AddHashtagAction {
  type: typeof ACTION_TYPES.ADD_HASHTAG;
  payload: { hashtag: string };
}

interface RemoveHashtagAction {
  type: typeof ACTION_TYPES.REMOVE_HASHTAG;
  payload: { hashtag: string };
}

interface AddImagesAction {
  type: typeof ACTION_TYPES.ADD_IMAGES;
  payload: { images: string[]; fileImages: File[] };
}

interface RemoveImageAction {
  type: typeof ACTION_TYPES.REMOVE_IMAGE;
  payload: { idx: number };
}

export type CreatedMeetingAction =
  | SetInitialDataAction
  | UpdateThumbnailAction
  | UpdateFieldAction
  | AddTopicAction
  | AddHashtagAction
  | RemoveHashtagAction
  | AddImagesAction
  | RemoveImageAction;

export default function useCreatedMeetingDetailIntroReducer() {
  const initialState = {
    thumbnailImagePreview: '',
    thumbnailImage: null,
    name: '',
    introduction: '',
    topic: '',
    hashtags: [],
    totalImages: [],
    addImages: [],
    existingImages: [],
    hostDescription: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(
    state: CreatedMeetingDetailStateType['intro'],
    action: CreatedMeetingAction,
  ) {
    switch (action.type) {
      case ACTION_TYPES.SET_INITIAL_DATA: {
        const payload = action.payload as SetInitialDataAction['payload'];
        return {
          thumbnailImagePreview: payload.thumbnailImage || '',
          thumbnailImage: null,
          name: payload.name || '',
          introduction: payload.introduction || '',
          totalImages: payload.totalImages || [],
          addImages: [],
          existingImages: payload.existingImages || [],
          topic: payload.topic || '',
          hashtags: payload.hashtags || [],
          hostDescription: payload.hostDescription || '',
        };
      }
      case ACTION_TYPES.UPDATE_THUMBNAIL: {
        const payload = action.payload as UpdateThumbnailAction['payload'];
        return {
          ...state,
          thumbnailImage: payload.value,
          thumbnailImagePreview: payload.previewValue,
        };
      }
      case ACTION_TYPES.UPDATE_FIELD: {
        const payload = action.payload as UpdateFieldAction['payload'];
        return {
          ...state,
          [payload.field]: payload.value,
        };
      }
      case ACTION_TYPES.ADD_TOPIC: {
        const payload = action.payload as AddTopicAction['payload'];
        return {
          ...state,
          topic: state.topic === payload.topic ? '' : payload.topic,
        };
      }
      case ACTION_TYPES.ADD_HASHTAG: {
        const payload = action.payload as AddHashtagAction['payload'];
        const newTag = payload.hashtag;
        if (state.hashtags.includes(newTag) || !newTag.trim()) {
          return state;
        }
        return {
          ...state,
          hashtags: [...state.hashtags, newTag],
        };
      }
      case ACTION_TYPES.REMOVE_HASHTAG: {
        const payload = action.payload as RemoveHashtagAction['payload'];
        const hashtagToRemove = payload.hashtag;
        return {
          ...state,
          hashtags: state.hashtags.filter((tag) => tag !== hashtagToRemove),
        };
      }
      case ACTION_TYPES.ADD_IMAGES: {
        const payload = action.payload as AddImagesAction['payload'];
        return {
          ...state,
          totalImages: [...state.totalImages, ...payload.images],
          addImages: [...state.addImages, ...payload.fileImages],
        };
      }

      case ACTION_TYPES.REMOVE_IMAGE: {
        const payload = action.payload as RemoveImageAction['payload'];
        return {
          ...state,
          totalImages: state.totalImages.filter(
            (_, idx) => idx !== payload.idx,
          ),
          addImages: state.addImages.filter(
            (file) =>
              file.lastModified !== state.addImages[payload.idx].lastModified,
          ),
          existingImages: state.existingImages.filter(
            (_, idx) => idx !== payload.idx,
          ),
        };
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  const updateData = useCallback(
    (
      thumbnailImage: string,
      name: string,
      introduction: string,
      totalImages: string[],
      existingImages: string[],
      topic: string,
      hashtags: string[],
      hostDescription: string,
    ) => {
      dispatch({
        type: ACTION_TYPES.SET_INITIAL_DATA,
        payload: {
          thumbnailImage: thumbnailImage,
          name: name,
          introduction: introduction,
          totalImages: totalImages,
          existingImages: existingImages,
          topic: topic,
          hashtags: hashtags,
          hostDescription: hostDescription,
        },
      });
    },
    [dispatch],
  );

  const updateThumbnailImage = (value: File, previewValue: string) =>
    dispatch({
      type: ACTION_TYPES.UPDATE_THUMBNAIL,
      payload: { value, previewValue },
    });

  const updateField = (
    field: 'name' | 'introduction' | 'hostDescription',
    value: string,
  ) =>
    dispatch({
      type: ACTION_TYPES.UPDATE_FIELD,
      payload: { field, value },
    });

  const updateTopic = (topic: string) =>
    dispatch({
      type: ACTION_TYPES.ADD_TOPIC,
      payload: { topic },
    });

  const addHashtag = (hashtag: string) =>
    dispatch({
      type: ACTION_TYPES.ADD_HASHTAG,
      payload: { hashtag },
    });

  const removeHashtag = (hashtag: string) =>
    dispatch({
      type: ACTION_TYPES.REMOVE_HASHTAG,
      payload: { hashtag },
    });

  const addImages = (images: string[], fileImages: File[]) =>
    dispatch({
      type: ACTION_TYPES.ADD_IMAGES,
      payload: { images, fileImages },
    });

  const removeImage = (idx: number) =>
    dispatch({
      type: ACTION_TYPES.REMOVE_IMAGE,
      payload: { idx },
    });

  return {
    state,
    updateData,
    updateThumbnailImage,
    updateField,
    updateTopic,
    addHashtag,
    removeHashtag,
    addImages,
    removeImage,
  };
}
