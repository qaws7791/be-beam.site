import { useState } from 'react';
import { Button } from '../atoms/button/Button';
import { Label } from '../atoms/label/Label';
import { RadioGroup, RadioGroupItem } from '../atoms/radio-group/RadioGroup';
import Text from '../atoms/text/Text';
import { useModalStore } from '@/stores/useModalStore';
import { Textarea } from '../atoms/textarea/Textarea';
import { useMutation } from '@tanstack/react-query';
import { axiosInstanceV1 } from '@/lib/axios';
import toast from 'react-hot-toast';
import { queryClient } from '@/root';
import clsx from 'clsx';
import { Input } from '../atoms/input/Input';

export default function MeetingCancelModal() {
  const radioList = [
    {
      id: 'personalSchedule',
      value: 'personalSchedule',
      label: '갑작스러운 개인 일정',
    },
    {
      id: 'changeMind',
      value: 'changeMind',
      label: '단순 변심',
    },
    {
      id: 'locationNonconformity',
      value: 'locationNonconformity',
      label: '장소가 너무 멀거나 불편함',
    },
    {
      id: 'etc',
      value: 'etc',
      label: '기타',
    },
  ];

  const { modalProps, close } = useModalStore();
  const [selectedOption, setSelectedOption] = useState('personalSchedule');
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState('');

  const { mutate: cancelMeeting, isPending } = useMutation({
    mutationFn: (data: { reasonType: string; description: string }) => {
      return axiosInstanceV1({
        method: 'POST',
        url: `/meetings/${modalProps.meetingId}/cancel`,
        data,
      });
    },
    onSuccess: () => {
      toast.success(
        modalProps.type === 'participating'
          ? '모임 중도 이탈 신청을 신청하였습니다.'
          : '모임 취소 신청을 신청하였습니다.',
      );
      queryClient.invalidateQueries({ queryKey: ['participatedMeetings'] });
      close();
    },
    onError: (err) => {
      toast.error('오류가 발생하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });

  const handleSubmit = () => {
    if (isPending) return;

    cancelMeeting({
      reasonType: selectedOption,
      description: description,
    });
  };

  const handleClickCancel = () => {
    close();
    toast(
      modalProps.type === 'participating'
        ? '모임 중도 이탈 신청을 취소하였습니다.'
        : '모임 취소 신청을 취소하였습니다.',
    );
  };

  console.log(modalProps);

  return (
    <div className="fixed top-0 left-0 z-1 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="z-2 rounded-xl bg-white p-8">
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between">
          <Text variant="T2_Semibold">신청 취소하기</Text>
          <Button
            variant="tertiary"
            size="icon"
            className="border-none"
            onClick={handleClickCancel}
          >
            <img
              className="h-6 w-6"
              src="/images/icons/close.svg"
              alt="close_icon"
            />
          </Button>
        </div>

        <div className="mt-5 w-full">
          <Text variant="T3_Semibold" className="mb-4">
            신청 취소 사유를 선택해 주세요.
          </Text>

          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="gap-4"
          >
            {radioList.map((option) => (
              <div key={option.id} className="mb-1 flex items-center gap-3">
                <RadioGroupItem
                  id={option.id}
                  value={option.value}
                  className="cursor-pointer"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor={option.id} className="cursor-pointer text-b1">
                    {option.label}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="mt-5 w-full">
          <Text variant="T3_Semibold">취소 사유를 자유롭게 작성해 주세요.</Text>
          <div className="relative">
            <Textarea
              placeholder="text"
              className="mt-3 h-[144px] w-[430px]"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                if (description.length <= 100) {
                  setDescription(e.target.value);
                }
              }}
            />
            <Text variant="B3_Regular" className="absolute right-5 bottom-3">
              <span className="text-primary">{description.length}</span> /
              <span
                className={
                  description.length === 100 ? 'text-primary' : 'text-black'
                }
              >
                100
              </span>
            </Text>
          </div>
        </div>

        <div
          className={clsx(
            modalProps.isCash ? 'block' : 'hidden',
            'mt-5 w-full',
          )}
        >
          <Text variant="T3_Semibold">환불 받을 계좌번호를 작성해 주세요.</Text>
          <Input
            type="tel"
            placeholder="환불 받을 계좌번호를 입력해주세요."
            value={account}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAccount(e.target.value)
            }
            className="mt-3"
          />
        </div>

        {/* 푸터 영역 */}
        <div className="mt-6 flex w-full items-center gap-4">
          <Button
            onClick={handleClickCancel}
            variant="tertiary"
            size="sm"
            className="border-gray-500 text-gray-600"
          >
            취소
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            신청 취소하기
          </Button>
        </div>
      </div>
    </div>
  );
}
