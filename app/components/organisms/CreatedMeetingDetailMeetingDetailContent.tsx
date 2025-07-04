import { useEffect } from 'react';
import useCreatedMeetingDetailDetailReducer from '@/hooks/business/useCreatedMeetingDetailDetailReducer';
import { Button } from '../atoms/button/Button';
import clsx from 'clsx';
import { Input } from '../atoms/input/Input';
import Text from '../atoms/text/Text';
import { DateInput } from '../molecules/DateInput';
import { Textarea } from '../atoms/textarea/Textarea';
import { useForm } from 'react-hook-form';
import type { GetCreateMeetingDetailDataType } from '@/types/components';

interface MeetingDetailFormFields {
  selectionType: string;
  mode: string;
  minParticipants: number;
  maxParticipants: number;
  recruitingStartTime: string;
  recruitingEndTime: string;
  paymentAmount: number;
  hostDescription: string;
  info: string;
}

export default function CreatedMeetingDetailMeetingDetailContent({
  createdMeetingDetail,
}: {
  createdMeetingDetail: GetCreateMeetingDetailDataType;
}) {
  const { state, updateData, updateField, selectField } =
    useCreatedMeetingDetailDetailReducer();

  useEffect(() => {
    updateData(
      createdMeetingDetail?.selectionType,
      createdMeetingDetail?.meetingMode,
      createdMeetingDetail?.minParticipants,
      createdMeetingDetail?.maxParticipants,
      createdMeetingDetail?.recruitingStartTime,
      createdMeetingDetail?.recruitingEndTime,
      createdMeetingDetail?.paymentAmount,
      createdMeetingDetail?.info,
    );
  }, [createdMeetingDetail, updateData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MeetingDetailFormFields>({
    defaultValues: {
      selectionType: '',
      mode: '',
      minParticipants: 0,
      maxParticipants: 0,
      recruitingStartTime: '',
      recruitingEndTime: '',
      paymentAmount: 0,
      info: '',
    },
  });

  useEffect(() => {
    reset({
      selectionType: state?.selectionType || '',
      mode: state?.mode || '',
      minParticipants: state?.minParticipants || 0,
      maxParticipants: state?.maxParticipants || 0,
      recruitingStartTime: state?.recruitingStartTime || '',
      recruitingEndTime: state?.recruitingEndTime || '',
      paymentAmount: state?.paymentAmount || 0,
      info: state.info || '',
    });
  }, [state, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // api 호출: 인자 data 사용
        console.log(data);
      })}
      className="w-full py-6"
    >
      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="selectionType"
          className="mb-3 block text-t2 text-gray-900"
        >
          모집 방법
        </label>
        <div className="mt-3 w-full">
          {['선착순', '선발형'].map((selectionType, idx) => (
            <Button
              {...register('selectionType', {
                required: '모집 방법 선택은 필수입니다.',
              })}
              key={idx}
              type="button"
              variant="tertiary"
              className={clsx(
                'mr-2 h-9 min-w-auto rounded-lg border-1 transition-all duration-700 hover:border-primary hover:bg-primary-light hover:text-primary',
                state.selectionType === selectionType
                  ? 'border-primary bg-primary-light text-primary'
                  : 'border-gray-300',
              )}
              onClick={() => selectField('selectionType', selectionType)}
            >
              {selectionType}
            </Button>
          ))}
        </div>
        {errors.selectionType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.selectionType.message}
          </p>
        )}
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="selectionType"
          className="mb-3 block text-t2 text-gray-900"
        >
          모집 방식
        </label>
        <div className="mt-3 w-full">
          {['오프라인', '온라인', '혼합'].map((mode, idx) => (
            <Button
              {...register('mode', {
                required: '모집 방법 선택은 필수입니다.',
              })}
              key={idx}
              type="button"
              variant="tertiary"
              className={clsx(
                'mr-2 h-9 min-w-auto rounded-lg border-1 transition-all duration-700 hover:border-primary hover:bg-primary-light hover:text-primary',
                state.mode === mode
                  ? 'border-primary bg-primary-light text-primary'
                  : 'border-gray-300',
              )}
              onClick={() => selectField('mode', mode)}
            >
              {mode}
            </Button>
          ))}
        </div>
        {errors.mode && (
          <p className="mt-1 text-sm text-red-600">{errors.mode.message}</p>
        )}
      </div>

      <div className="mb-4 grid w-full grid-cols-2 items-center gap-4">
        <div className="box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
          <label
            htmlFor="minParticipants"
            className="mb-3 block text-t2 text-gray-900"
          >
            최소 인원
          </label>
          <div className="flex items-center gap-2">
            <Input
              {...register('minParticipants', {
                required: '최소 인원 작성은 필수입니다.',
                min: {
                  value: 1,
                  message: '1명 이상을 입력하세요.',
                },
              })}
              id="minParticipants"
              type="number"
              className="mt-1 box-border flex-1 border-gray-300 p-3 shadow-none"
              onChange={(e) =>
                updateField('minParticipants', Number(e.target.value))
              }
              value={state.minParticipants}
            />
            <Text variant="T2_Semibold">명</Text>
          </div>
          {errors.minParticipants && (
            <p className="mt-1 text-sm text-red-600">
              {errors.minParticipants.message}
            </p>
          )}
        </div>
        <div className="box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
          <label
            htmlFor="maxParticipants"
            className="mb-3 block text-t2 text-gray-900"
          >
            최대 인원
          </label>
          <div className="flex items-center gap-2">
            <Input
              {...register('maxParticipants', {
                required: '최대 인원 작성은 필수입니다.',
              })}
              id="maxParticipants"
              type="number"
              className="mt-1 box-border flex-1 border-gray-300 p-3 shadow-none"
              onChange={(e) =>
                updateField('maxParticipants', Number(e.target.value))
              }
              value={state.maxParticipants}
            />
            <Text variant="T2_Semibold">명</Text>
          </div>
          {errors.maxParticipants && (
            <p className="mt-1 text-sm text-red-600">
              {errors.maxParticipants.message}
            </p>
          )}
        </div>
      </div>

      <div className="box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="recruitingEndTime"
          className="mb-3 block text-t2 text-gray-900"
        >
          모집 기간
        </label>
        <DateInput
          {...register('recruitingEndTime', {
            required: '모집 기간 작성은 필수입니다.',
          })}
          id="recruitingEndTime"
          value={state.recruitingEndTime}
          onChange={(newDateString) => {
            updateField('recruitingEndTime', newDateString);
          }}
          className="mt-1"
          placeholder="YYYY.MM.DD"
        />
        {errors.selectionType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.selectionType.message}
          </p>
        )}
      </div>

      <div className="mt-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="paymentAmount"
          className="mb-3 block text-t2 text-gray-900"
        >
          참가비
        </label>
        <div className="flex w-full items-center gap-2">
          <Input
            {...register('paymentAmount', {
              required: '참가비 작성은 필수입니다.',
              min: {
                value: 0,
                message: '0원 이상을 입력하세요.',
              },
            })}
            id="paymentAmount"
            type="number"
            className="mt-1 box-border flex-1 border-gray-300 p-3 shadow-none"
            onChange={(e) =>
              updateField('paymentAmount', Number(e.target.value))
            }
            value={state.paymentAmount}
          />
          <Text variant="T2_Semibold">원</Text>
        </div>
        {errors.paymentAmount && (
          <p className="mt-1 text-sm text-red-600">
            {errors.paymentAmount.message}
          </p>
        )}

        <Text
          variant="B3_Regular"
          color="gray-600"
          className="mt-3 box-border w-full rounded-lg bg-white p-2"
        >
          📢 무료 모임의 경우 0원으로 입력해주세요.
        </Text>
      </div>

      <div className="mt-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label htmlFor="info" className="mb-3 block text-t2 text-gray-900">
          공지사항
        </label>
        <Textarea
          {...register('info', {
            required: '공지사항은 필수입니다.',
            minLength: {
              value: 10,
              message: '10글자 이상 입력해주세요.',
            },
            maxLength: {
              value: 500,
              message: '2000글자 이하로 입력해주세요.',
            },
          })}
          id="info"
          className="mt-1 box-border h-[154px] flex-1 border-gray-300 bg-white p-4 shadow-none"
          onChange={(e) => updateField('info', e.target.value)}
          value={state.info}
        />
        {errors.info && (
          <p className="mt-1 text-sm text-red-600">{errors.info.message}</p>
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
