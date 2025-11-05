import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { API_V1_BASE_URL } from '@/shared/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axios';
import { createMeetingFourthSchema } from '@/features/meetings/schemas/meeting';
import { format } from 'date-fns';

import { cn } from '@/styles/tailwind';
import type { CreateMeeting } from '@/shared/types/components';
import type { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/ui/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/Accrodion';
import Text from '@/shared/components/ui/Text';
import { DateInput } from '@/shared/components/common/DateInput';
import { TimeInput } from '@/shared/components/common/TimeInput';
import { AddressInput } from '@/shared/components/common/AddressInput';
import { meetingQueryKeys } from '@/features/meetings/queries/queryKeys';

import { Checkbox } from '@/shared/components/ui/Checkbox';
import TrashIcon from '@/shared/components/icons/TrashIcon';
interface CreateMeetingFourthContentProps {
  tab: number;
  setTab: (tab: number) => void;
  form: CreateMeeting;
  setForm: (form: CreateMeeting) => void;
}

export default function CreateMeetingFourthContent({
  tab,
  setTab,
  form,
  setForm,
}: CreateMeetingFourthContentProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedScheduleIds, setSelectedScheduleIds] = useState<
    Set<number | null>
  >(new Set());

  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof createMeetingFourthSchema>
  >({
    resolver: zodResolver(createMeetingFourthSchema),
    defaultValues: {
      schedules: form.schedules ?? [
        {
          meetingDate: '',
          meetingStartTime: '',
          meetingEndTime: '',
          address: '',
          addressDetail: '',
        },
      ],
    },
  });

  // 'schedules' 배열 필드 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  });

  console.log(form);

  const { mutate: createMeeting, isPending } = useMutation({
    mutationFn: (form: CreateMeeting) => {
      const formData = new FormData();

      if (form.thumbnailImage) {
        formData.append('thumbnailImage', form.thumbnailImage);
      }

      form.images.forEach((file) => {
        formData.append('files', file);
      });

      let recruitingEndDate;
      if (form.recruitingEndTime) {
        recruitingEndDate = new Date(form.recruitingEndTime);
        recruitingEndDate.setDate(recruitingEndDate.getDate() + 1);
      }

      formData.append(
        'data',
        new Blob(
          [
            JSON.stringify({
              name: form.name,
              recruitmentType: form.recruitmentType,
              selectionType: form.selectionType,
              meetingMode: form.meetingMode,
              topicId: form.topicId,
              hashtags: form.hashtags,
              guidbookReferenceId: form.guidebookReferenceId,
              introduction: form.introduction,
              minParticipants: form.minParticipants,
              maxParticipants: form.maxParticipants,
              hostDescription: form.hostDescription,
              recruitingStartTime: format(
                form.recruitingStartTime as Date,
                "yyyy-MM-dd'T'HH:mm:ss",
              ),
              recruitingEndTime: recruitingEndDate
                ? format(recruitingEndDate, "yyyy-MM-dd'T'HH:mm:ss")
                : null,
              paymentAmount: form.paymentAmount,
              info: form.info,
              schedules: form.schedules,
            }),
          ],
          { type: 'application/json' },
        ),
      );

      return axiosInstance({
        baseURL: API_V1_BASE_URL,
        method: 'POST',
        url: '/meetings',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
    },
    onSuccess: () => {
      toast.success('모임 개설을 완료하였습니다.');
      queryClient.invalidateQueries({ queryKey: meetingQueryKeys._def });
      navigate('/meetings');
    },
    onError: (err) => {
      toast.error('오류가 발생하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });

  const onSubmit = () => {
    if (isPending) return;
    createMeeting(form);
  };

  const handleSelectOne = useCallback((fieldId: number, isChecked: boolean) => {
    setSelectedScheduleIds((prev) => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(fieldId);
      } else {
        newSet.delete(fieldId);
      }
      return newSet;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (selectedScheduleIds.size === 0) {
      alert('삭제할 일정을 선택해주세요.');
      return;
    }

    const indexesToDelete = fields
      .map((field, idx) => ({ originIdx: idx, id: field.id }))
      .filter((_, idx) => selectedScheduleIds.has(idx))
      .sort((a, b) => b.originIdx - a.originIdx);

    indexesToDelete.forEach((field) => {
      const idx = fields.findIndex((f) => f.id === field.id);
      console.log(idx);
      remove(idx);
    });

    setSelectedScheduleIds(new Set());
  }, [selectedScheduleIds, fields, remove]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="box-border w-full px-4 md:px-0"
    >
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <div className="rounded-lg bg-gray-200 p-2 text-b3 text-gray-600">
            📢 ‘일정 등록하기’ 버튼을 눌러 추가 일정을 등록할 수 있어요.
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleDeleteSelected}
              disabled={selectedScheduleIds.size === 0}
              className={cn(
                form.recruitmentType === '소모임' && 'hidden',
                'h-12 items-center gap-1 border-1 border-[#FF4D4C] bg-[#ffeded] px-4 py-2 text-[#FF4D4C] hover:bg-[#ffeded]',
              )}
            >
              <TrashIcon />
              삭제
            </Button>
            <Button
              type="button"
              size="md"
              className={cn(
                form.recruitmentType === '소모임' && 'hidden',
                'hidden px-5 md:flex',
              )}
              onClick={() => {
                const newSchedule = {
                  meetingDate: '',
                  meetingStartTime: '',
                  meetingEndTime: '',
                  address: '',
                  addressDetail: '',
                };

                append(newSchedule);
                setForm({
                  ...form,
                  schedules: [...form.schedules, newSchedule],
                });
              }}
            >
              <img src="/images/icons/w_plus.svg" alt="plus_icon" />
              일정 등록하기
            </Button>
          </div>
        </div>

        <div className="w-full">
          {fields.map((field, idx) => (
            <Accordion
              key={field.id}
              type="single"
              collapsible
              className={cn(
                selectedScheduleIds.has(idx)
                  ? 'border-[#FF4D4C]'
                  : 'border-gray-300',
                'mt-5 box-border w-full rounded-lg border-1 bg-gray-100 p-5',
              )}
            >
              <AccordionItem
                value="item-1"
                className="border-b-1 border-gray-400"
              >
                <AccordionTrigger className="pt-0">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`select-schedule-${idx}`}
                      className={cn(
                        form.recruitmentType === '소모임' && 'hidden',
                        'mr-2 size-5 cursor-pointer data-[state=checked]:border-[#FF4D4C] data-[state=checked]:bg-[#FF4D4C]',
                      )}
                      checked={selectedScheduleIds.has(idx)}
                      onCheckedChange={(value: boolean) =>
                        handleSelectOne(idx, value)
                      }
                    />
                    <Text
                      variant="T2_Semibold"
                      color="gray-900"
                      className="text-left"
                    >
                      <span
                        className={cn(
                          form.recruitmentType === '소모임' && 'hidden',
                        )}
                      >
                        {idx + 1}일차_
                      </span>
                      일정
                    </Text>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="mb-5 w-full">
                    <label htmlFor="meetingDate" className="text-b1">
                      일정
                    </label>
                    <Controller
                      name={`schedules.${idx}.meetingDate`}
                      control={control}
                      render={({ field }) => (
                        <DateInput
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            setForm({
                              ...form,
                              schedules: form.schedules.map(
                                (schedule, index) =>
                                  index === idx
                                    ? {
                                        ...schedule,
                                        meetingDate: e,
                                      }
                                    : schedule,
                              ),
                            });
                          }}
                          placeholder="YYYY.MM.DD"
                          className="mt-2 w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="mt-2 mb-5 w-full">
                    <label htmlFor="meetingTime" className="text-b1">
                      시간 선택
                    </label>
                    <div className="mt-2 flex w-full items-center gap-2">
                      <Controller
                        name={`schedules.${idx}.meetingStartTime`}
                        control={control}
                        render={({ field }) => (
                          <TimeInput
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              setForm({
                                ...form,
                                schedules: form.schedules.map(
                                  (schedule, index) =>
                                    index === idx
                                      ? {
                                          ...schedule,
                                          meetingStartTime: e,
                                        }
                                      : schedule,
                                ),
                              });
                            }}
                            placeholder="00:00"
                            className="w-full"
                            format12Hour={true}
                          />
                        )}
                      />
                      -
                      <Controller
                        name={`schedules.${idx}.meetingEndTime`}
                        control={control}
                        render={({ field }) => (
                          <TimeInput
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              setForm({
                                ...form,
                                schedules: form.schedules.map(
                                  (schedule, index) =>
                                    index === idx
                                      ? {
                                          ...schedule,
                                          meetingEndTime: e,
                                        }
                                      : schedule,
                                ),
                              });
                            }}
                            placeholder="00:00"
                            className="w-full"
                            format12Hour={true}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-5 w-full">
                    <label htmlFor="address" className="text-b1">
                      모임 장소
                    </label>
                    <Controller
                      name={`schedules.${idx}.address`}
                      control={control}
                      render={({ field: addressField }) => (
                        <Controller
                          name={`schedules.${idx}.addressDetail`}
                          control={control}
                          render={({ field: addressDetailField }) => (
                            <AddressInput
                              address={addressField.value}
                              addressDetail={addressDetailField.value || ''}
                              onChange={(address, addressDetail) => {
                                addressField.onChange(address);
                                addressDetailField.onChange(addressDetail);
                                setForm({
                                  ...form,
                                  schedules: form.schedules.map(
                                    (schedule, index) =>
                                      index === idx
                                        ? {
                                            ...schedule,
                                            address: address,
                                            addressDetail: addressDetail,
                                          }
                                        : schedule,
                                  ),
                                });
                              }}
                              placeholder="장소를 선택해주세요."
                              className="mt-2 w-full"
                            />
                          )}
                        />
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          <Button
            type="button"
            size="md"
            className={cn(
              form.recruitmentType === '소모임' && 'hidden',
              'mt-5 flex w-full px-5 md:hidden',
            )}
            onClick={() => {
              const newSchedule = {
                meetingDate: '',
                meetingStartTime: '',
                meetingEndTime: '',
                address: '',
                addressDetail: '',
              };

              append(newSchedule);
              setForm({
                ...form,
                schedules: [...form.schedules, newSchedule],
              });
            }}
          >
            <img src="/images/icons/w_plus.svg" alt="plus_icon" />
            일정 등록하기
          </Button>
        </div>
      </div>

      <div className="mt-20 grid w-full grid-cols-2 items-center gap-3">
        <Button type="button" variant="outline" onClick={() => setTab(tab - 1)}>
          이전
        </Button>
        <Button disabled={!formState.isValid}>완료</Button>
      </div>
    </form>
  );
}
