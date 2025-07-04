import { useEffect } from 'react';
import type { GetCreateMeetingDetailDataType } from '@/types/components';
import { useForm } from 'react-hook-form';
import useCreatedMeetingDetailDetailReducer from '@/hooks/business/useCreatedMeetingDetailDetailReducer';

import Text from '../atoms/text/Text';
import { Input } from '../atoms/input/Input';
import { DateInput } from '../molecules/DateInput';
import { TimeInput } from '../molecules/TimeInput';
import { AddressInput } from '../molecules/AddressInput';
import { Button } from '../atoms/button/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../atoms/accordion/Accrodion';

interface ScheduleDetailFormFields {
  schedules: {
    content: string;
    address: string;
    addressDetail: string;
    meetingDate: string;
    meetingStartTime: string;
    meetingEndTime: string;
  }[];
}

export default function CreatedScheduleDetailMeetingDetailContent({
  createdMeetingDetail,
}: {
  createdMeetingDetail: GetCreateMeetingDetailDataType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ScheduleDetailFormFields>({
    defaultValues: {
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
    },
  });

  const {
    state,
    updateData,
    updateField,
    addScheduleField,
    updateScheduleField,
    removeScheduleField,
  } = useCreatedMeetingDetailDetailReducer();
  console.log(state);

  useEffect(() => {
    if (createdMeetingDetail) {
      updateData(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        createdMeetingDetail?.schedules,
      );
    }
  }, [createdMeetingDetail, updateData]);

  useEffect(() => {
    reset({
      schedules: state?.schedules || [
        {
          content: '',
          address: '',
          addressDetail: '',
          meetingDate: '',
          meetingStartTime: '',
          meetingEndTime: '',
        },
      ],
    });
  }, [state, reset]);

  return (
    <div className="w-full py-8">
      <div className="flex w-full items-center justify-between">
        <Text
          variant="B3_Regular"
          color="gray-600"
          className="inline-block rounded-lg bg-gray-200 p-2"
        >
          📢 ‘일정 등록하기’ 버튼을 눌러 추가 일정을 등록할 수 있어요.
        </Text>

        <Button
          className="flex h-12 min-w-40 items-center gap-2"
          onClick={addScheduleField}
        >
          <img src="/images/icons/w_plus.svg" alt="plus_icon" />
          일정 등록하기
        </Button>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        {state?.schedules.map((schedule, idx) => (
          <Accordion
            key={idx}
            type="single"
            collapsible
            className="mt-5 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5"
          >
            <AccordionItem
              value="item-1"
              className="border-b-1 border-gray-400"
            >
              <AccordionTrigger>
                <Text
                  variant="T2_Semibold"
                  color="gray-900"
                  className="text-left"
                >
                  {idx + 1}일차 일정
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-5 w-full">
                  <label htmlFor="meetingDate">일정</label>
                  <DateInput
                    {...register(`schedules.${idx}.meetingDate`, {
                      required: '모임 날짜 작성은 필수입니다.',
                    })}
                    id="meetingDate"
                    value={schedule.meetingDate}
                    onChange={(newDateString) =>
                      updateScheduleField(
                        idx,
                        'meetingDate',
                        false,
                        newDateString,
                      )
                    }
                    className="mt-2"
                    placeholder="YYYY.MM.DD"
                  />
                  {errors.schedules?.[idx]?.meetingDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.schedules?.[idx]?.meetingDate.message}
                    </p>
                  )}
                </div>

                <div className="mt-2 mb-5 w-full">
                  <label htmlFor="meetingTime">시간 선택</label>
                  <div className="mt-2 flex w-full items-center gap-2">
                    <TimeInput
                      {...register(`schedules.${idx}.meetingStartTime`, {
                        required: '모임 시작 시간 작성은 필수입니다.',
                      })}
                      id="meetingTime"
                      value={schedule.meetingStartTime}
                      onChange={(newTimeString) =>
                        updateScheduleField(
                          idx,
                          'meetingStartTime',
                          false,
                          newTimeString,
                        )
                      }
                      className="flex-1"
                      placeholder="00:00 AM/PM"
                      format12Hour={true}
                    />
                    -
                    <TimeInput
                      {...register(`schedules.${idx}.meetingEndTime`, {
                        required: '모임 종료 시간 작성은 필수입니다.',
                      })}
                      id="meetingTime"
                      value={schedule.meetingEndTime}
                      onChange={(newTimeString) =>
                        updateScheduleField(
                          idx,
                          'meetingEndTime',
                          false,
                          newTimeString,
                        )
                      }
                      className="flex-1"
                      placeholder="00:00 AM/PM"
                      format12Hour={true}
                    />
                  </div>

                  <div className="flex w-full items-center gap-2">
                    {errors.schedules?.[idx]?.meetingStartTime && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.schedules?.[idx]?.meetingStartTime.message}
                      </p>
                    )}
                    {errors.schedules?.[idx]?.meetingEndTime && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.schedules?.[idx]?.meetingEndTime.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5 w-full">
                  <label htmlFor="address">모임 장소</label>
                  <AddressInput
                    {...register(`schedules.${idx}.address`, {
                      required: '모임 장소 작성은 필수입니다.',
                    })}
                    {...register(`schedules.${idx}.addressDetail`, {
                      required: '모임 상세 주소 작성은 필수입니다.',
                    })}
                    id="address"
                    address={schedule.address}
                    addressDetail={schedule.addressDetail as string}
                    onChange={(newAddress, newAddressDetail) =>
                      updateScheduleField(
                        idx,
                        'address',
                        true,
                        newAddress,
                        newAddressDetail,
                      )
                    }
                    className="mt-2"
                    placeholder="모집 장소를 입력해주세요."
                  />
                  <div className="flex w-full items-center gap-2">
                    {errors.schedules?.[idx]?.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.schedules?.[idx]?.address.message}
                      </p>
                    )}
                    {errors.schedules?.[idx]?.addressDetail && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.schedules?.[idx]?.addressDetail.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="meetingContent">콘텐츠</label>
                  <Input
                    {...register(`schedules.${idx}.content`, {
                      required: '컨텐츠 작성은 필수입니다.',
                      minLength: {
                        value: 10,
                        message: '10글자 이상 입력해주세요.',
                      },
                    })}
                    type="text"
                    id="meetingContent"
                    value={schedule.content}
                    onChange={(e) =>
                      updateField('content', e.target.value, idx)
                    }
                    className="mt-2"
                    placeholder="콘텐츠를 입력해주세요."
                  />
                  {errors.schedules?.[idx]?.content && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.schedules?.[idx]?.content.message}
                    </p>
                  )}
                </div>

                <Button
                  className="mt-5 w-full"
                  onClick={() => removeScheduleField(idx)}
                >
                  삭제하기
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        <input
          type="hidden"
          {...register('schedules', {
            validate: (value) =>
              value.length > 0 || '스케쥴을 최소 하나 이상 등록해주세요.',
          })}
        />
        {errors.schedules && (
          <p className="mt-1 text-sm text-red-600">
            {errors.schedules.message}
          </p>
        )}
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
    </div>
  );
}
