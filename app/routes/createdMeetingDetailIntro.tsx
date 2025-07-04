import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useCreatedMeetingDetailQuery from '@/hooks/api/useCreatedMeetingDetailQuery';
import useCreatedMeetingDetailIntroReducer from '@/hooks/business/useCreatedMeetingDetailIntroReducer';

import clsx from 'clsx';
import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import Text from '@/components/atoms/text/Text';
import { Textarea } from '@/components/atoms/textarea/Textarea';

interface MeetingIntroFormFields {
  thumbnailImage: string;
  name: string;
  introduction: string;
  topic: string;
  hashtags: string[];
  hostDescription: string;
  images: string[];
}

export function meta() {
  return [
    { title: '내가 개설한 모임 소개 페이지 입니다.' },
    {
      name: 'description',
      content: '내가 개설한 모임의 소개 정보를 확인하세요.',
    },
  ];
}

export default function CreatedMeetingDetailIntro() {
  const topicList = [
    '독서 · 글쓰기',
    '소셜 다이닝',
    '운동 · 야외활동',
    '사진',
    '환경 · 제로웨이스트',
    '언어 · 스터디',
  ];

  const id = Number(useParams().meetingId);
  const { data: createdMeetingDetail } = useCreatedMeetingDetailQuery(id);

  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);
  const [hashtag, setHashtag] = useState('');

  const {
    state,
    updateData,
    updateThumbnailImage,
    updateField,
    updateTopic,
    addHashtag,
    removeHashtag,
    addImages,
    removeImage,
  } = useCreatedMeetingDetailIntroReducer();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MeetingIntroFormFields>({
    defaultValues: {
      thumbnailImage: '',
      name: '',
      introduction: '',
      topic: '',
      hashtags: [],
      hostDescription: '',
      images: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      updateThumbnailImage(file, newImageUrl);
    }
  };
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const possibleLength = 10 - state.totalImages.length;
    const selectedFiles = Array.from(e.target.files).slice(0, possibleLength);

    const existingFileNames = state.addImages.map((file) => file.name);
    const filterFiles = selectedFiles.filter(
      (newFile) => !existingFileNames.includes(newFile.name),
    );

    const newImageUrls = filterFiles.map((file) => {
      return URL.createObjectURL(file);
    });

    addImages(newImageUrls, filterFiles);
  };

  useEffect(() => {
    if (hiddenSpanRef.current && inputRef.current) {
      const minWidth = 40;

      hiddenSpanRef.current.textContent = hashtag;
      const contentWidth = hiddenSpanRef.current.offsetWidth;
      const newWidth = Math.max(minWidth, contentWidth + 10);

      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [hashtag]);

  useEffect(() => {
    updateData(
      createdMeetingDetail?.thumbnailImage,
      createdMeetingDetail?.name,
      createdMeetingDetail?.introduction,
      createdMeetingDetail?.meetingImages,
      createdMeetingDetail?.meetingImages,
      createdMeetingDetail?.topic,
      createdMeetingDetail?.hashtags,
      createdMeetingDetail?.hostDescription,
    );
  }, [createdMeetingDetail, updateData]);

  useEffect(() => {
    reset({
      name: state?.name || '',
      introduction: state?.introduction || '',
      topic: state?.topic || '',
      hashtags: state?.hashtags || [],
      hostDescription: state?.hostDescription || '',
      images: state.totalImages || [],
    });

    if (state?.thumbnailImagePreview) {
      setValue('thumbnailImage', state.thumbnailImagePreview);
    } else {
      setValue('thumbnailImage', '');
    }
  }, [state, reset, setValue]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // api 호출: 인자 data 사용
        console.log(data);
      })}
      className="w-full py-8"
    >
      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="thumbnailImage"
          className="mb-3 block text-t2 text-gray-900"
        >
          썸네일 이미지
        </label>

        <div className="relative h-32 w-32">
          <img
            className="h-full w-full overflow-hidden rounded-lg border-1 border-gray-300 object-cover"
            src={state.thumbnailImagePreview}
            alt="meeting_thumbnail_image"
          />

          <label className="absolute top-[32%] left-[34%] cursor-pointer rounded-full border-1 border-white bg-[rgba(0,0,0,0.1)] p-3 transition-all duration-700 hover:bg-[rgba(0,0,0,0.2)]">
            <input
              name="thumbnail"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <img
              className="h-5 w-5"
              src="/images/icons/w_camera.svg"
              alt="camera_icon"
            />
          </label>
        </div>
        {errors.thumbnailImage && (
          <p className="mt-1 text-sm text-red-600">
            {errors.thumbnailImage.message}
          </p>
        )}
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label htmlFor="name" className="mb-3 block text-t2 text-gray-900">
          모임명
        </label>
        <Input
          {...register('name', {
            required: '모임명은 필수입니다.',
            minLength: {
              value: 2,
              message: '2글자 이상 입력해주세요.',
            },
          })}
          id="name"
          type="text"
          className="mt-1 box-border w-full border border-gray-300 p-3"
          onChange={(e) => updateField('name', e.target.value)}
          value={state.name}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="description"
          className="mb-3 block text-t2 text-gray-900"
        >
          모집 소개
        </label>
        <Textarea
          {...register('introduction', {
            required: '모임 설명은 필수입니다.',
            minLength: {
              value: 10,
              message: '10글자 이상 입력해주세요.',
            },
            maxLength: {
              value: 500,
              message: '500글자 이하로 입력해주세요.',
            },
          })}
          id="description"
          className="mt-1 box-border h-[124px] w-full border border-gray-300 bg-white p-3 shadow-none"
          onChange={(e) => updateField('introduction', e.target.value)}
          value={state.introduction}
        />
        {errors.introduction && (
          <p className="mt-1 text-sm text-red-600">
            {errors.introduction.message}
          </p>
        )}
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label htmlFor="topic" className="mb-3 block text-t2 text-gray-900">
          모집 토픽
        </label>
        <div className="mt-3 w-full">
          {topicList.map((topic, idx) => (
            <Button
              {...register('topic', {
                required: '토픽 선택은 필수입니다.',
              })}
              key={idx}
              type="button"
              variant="tertiary"
              className={clsx(
                'mr-2 h-9 min-w-auto rounded-lg border-1 transition-all duration-700 hover:border-primary hover:bg-primary-light hover:text-primary',
                state.topic === topic
                  ? 'border-primary bg-primary-light text-primary'
                  : 'border-gray-300',
              )}
              onClick={() => updateTopic(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
        {errors.topic && (
          <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>
        )}
      </div>

      <div className="mb-4 box-border block w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label htmlFor="hashtags" className="mb-3 text-t2 text-gray-900">
          해쉬태그
        </label>
        <div className="mt-3 flex w-full gap-2">
          {state.hashtags.map((hashtag, idx) => (
            <div key={idx}>
              <div className="flex gap-1 rounded-lg bg-primary-light p-2 text-b1 text-primary">
                {hashtag}
                <button
                  onClick={() => removeHashtag(hashtag)}
                  className="cursor-pointer"
                >
                  <img src="/images/icons/orange_close.svg" alt="close_icon" />
                </button>
              </div>
            </div>
          ))}

          <div
            className={clsx(
              state.hashtags.length >= 10 ? 'hidden' : 'block',
              'flex items-center bg-primary-light pr-2',
            )}
          >
            <Input
              ref={inputRef}
              type="text"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addHashtag(hashtag);
                  setHashtag('');
                }
              }}
              className="h-auto w-auto border-0 bg-transparent py-2 pl-2 text-b1 text-primary shadow-none"
            />
            <span
              ref={hiddenSpanRef}
              className="invisible absolute box-border p-2 whitespace-pre text-inherit"
            />
            <button
              onClick={() => setHashtag('')}
              className={clsx(
                hashtag.length > 0 ? 'block' : 'hidden',
                'cursor-pointer',
              )}
            >
              <img src="/images/icons/orange_close.svg" alt="close_icon" />
            </button>
          </div>
        </div>

        <input
          type="hidden"
          {...register('hashtags', {
            validate: (value) =>
              value.length > 0 || '해시태그는 최소 하나 이상 필요합니다.',
          })}
        />
        {errors.hashtags && (
          <p className="mt-1 text-sm text-red-600">{errors.hashtags.message}</p>
        )}
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="meetingImages"
          className="mb-3 block text-t2 text-gray-900"
        >
          모임 사진
        </label>

        <div
          className={clsx(
            state.totalImages.length > 0 && 'flex',
            'w-full items-center gap-2',
          )}
        >
          <div className="flex items-center gap-2">
            {state.totalImages.map((image, idx) => (
              <div key={idx} className="relative">
                <img
                  className="h-32 w-32 overflow-hidden rounded-lg border-1 border-gray-300 object-cover"
                  src={image}
                  alt="meeting_thumbnail_image"
                />
                <button
                  className="absolute top-2 right-2 cursor-pointer rounded-full bg-gray-300"
                  onClick={() => removeImage(idx)}
                >
                  <img src="/images/icons/close.svg" alt="close_icon" />
                </button>
              </div>
            ))}
          </div>

          <label
            className={clsx(
              state.totalImages.length >= 10 && 'hidden',
              'flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-500',
            )}
          >
            <input
              id="meetingImages"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFilesChange}
            />
            <div className="flex flex-col items-center">
              <img
                className="h-5 w-5"
                src="/images/icons/camera.svg"
                alt="camera_icon"
              />
              <Text variant="B3_Regular" color="gray-500" className="mt-[6px]">
                {state.totalImages.length}/10
              </Text>
            </div>
          </label>
        </div>
        <input
          type="hidden"
          {...register('images', {
            validate: (value) =>
              value.length > 0 || '모임 이미지는 최소 하나 이상 필요합니다.',
          })}
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
        )}
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="hostDescription"
          className="mb-3 block text-t2 text-gray-900"
        >
          호스트 소개
        </label>
        <Textarea
          {...register('hostDescription', {
            required: '호스트 소개는 필수입니다.',
            minLength: {
              value: 10,
              message: '10글자 이상 입력해주세요.',
            },
            maxLength: {
              value: 500,
              message: '500글자 이하로 입력해주세요.',
            },
          })}
          id="description"
          className="mt-1 box-border h-[124px] w-full border border-gray-300 bg-white p-3 shadow-none"
          onChange={(e) => updateField('hostDescription', e.target.value)}
          value={state.hostDescription}
        />
        {errors.hostDescription && (
          <p className="mt-1 text-sm text-red-600">
            {errors.hostDescription.message}
          </p>
        )}
      </div>

      <div className="flex w-full justify-center">
        <Button
          className="mt-5 min-w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? '수정 중' : '수정 완료'}
        </Button>
      </div>
    </form>
  );
}
