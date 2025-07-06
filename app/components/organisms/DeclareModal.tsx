import { queryClient } from '@/root';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { API_V1_BASE_URL } from '@/constants/api';
import { useModalStore } from '@/stores/useModalStore';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { declareReasonSchema } from '@/schemas/meeting';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../atoms/dialog/Dialog';
import { Button } from '../atoms/button/Button';
import toast from 'react-hot-toast';
import Text from '../atoms/text/Text';
import { RadioGroup, RadioGroupItem } from '../atoms/radio-group/RadioGroup';
import { Label } from '../atoms/label/Label';
import { Textarea } from '../atoms/textarea/Textarea';

export default function DeclareModal() {
  const { isOpen, modalProps, close } = useModalStore();

  const radioList = [
    {
      id: 'ADVERTISEMENT',
      value: 'ADVERTISEMENT',
      label: '불법 광고',
    },
    {
      id: 'SEXUAL',
      value: 'SEXUAL',
      label: '음란성/선정성',
    },
    {
      id: 'PERSONAL_ATTACKS',
      value: 'PERSONAL_ATTACKS',
      label: '욕설/인신공격',
    },
    {
      id: 'COMMERCIAL',
      value: 'COMMERCIAL',
      label: '영리목적',
    },
    {
      id: 'SPAM',
      value: 'SPAM',
      label: '도배성 글',
    },
    {
      id: 'SPYWARE',
      value: 'SPYWARE',
      label: '악성 코드/스파이웨어',
    },
    {
      id: 'PRIVACY_VIOLATION',
      value: 'PRIVACY_VIOLATION',
      label: '개인정보 노출/사생활 침해',
    },
    {
      id: 'OTHER',
      value: 'OTHER',
      label: '기타',
    },
  ];

  const { mutate: delareMutate, isPending } = useMutation({
    mutationFn: (data: { reasonType: string; description: string }) => {
      return axiosInstance({
        baseURL: API_V1_BASE_URL,
        method: 'POST',
        url: '/complaints',
        data: {
          complaintId: modalProps.id,
          complaintType:
            modalProps.type === 'meeting'
              ? 'MEETING'
              : modalProps.type === 'review'
                ? 'REVIEW'
                : 'USER',
          ...data,
        },
      });
    },
    onSuccess: () => {
      toast.success(
        `${modalProps.type === 'meeting' ? '해당 모임을' : modalProps.type === 'review' ? '해당 모임 후기를' : '해당 호스트를'} 신고하였습니다.`,
      );
      queryClient.invalidateQueries({ queryKey: ['meeting'] });
      close();
    },
    onError: (err) => {
      toast.error('오류가 발생하였습니다. 다시 시도해주세요.');
      console.error('Meeting cancellation failed:', err);
    },
  });

  const { control, reset, handleSubmit, formState } = useForm<
    z.infer<typeof declareReasonSchema>
  >({
    resolver: zodResolver(declareReasonSchema),
    defaultValues: {
      reasonType: 'ADVERTISEMENT',
      description: '',
    },
  });

  function onSubmit(data: z.infer<typeof declareReasonSchema>) {
    if (isPending) return;
    delareMutate(data);

    reset();
    close();
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-t2">
            {`${
              modalProps.type === 'meeting'
                ? '모임'
                : modalProps.type === 'review'
                  ? '모임 후기'
                  : '호스트'
            } 신고하기`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 w-full">
            <Text variant="T3_Semibold" className="mb-4">
              신고 사유를 선택해 주세요
            </Text>

            <Controller
              name="reasonType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="gap-4"
                >
                  {radioList.map((option) => (
                    <div
                      key={option.id}
                      className="mb-1 flex items-center gap-3"
                    >
                      <RadioGroupItem
                        id={option.id}
                        value={option.value}
                        className="cursor-pointer"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={option.id}
                          className="cursor-pointer text-b1"
                        >
                          {option.label}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>

          <div className="mt-5 w-full">
            <Text variant="T3_Semibold">
              신고 사유를 자유롭게 작성해 주세요.
            </Text>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="text"
                  className="mt-3 h-[144px] w-[430px]"
                  {...field}
                  maxLength={100}
                />
              )}
            />
          </div>

          <DialogFooter className="mt-6 flex w-full items-center gap-4">
            <Button
              type="button"
              onClick={() => {
                close();
                toast(
                  `${modalProps.type === 'meeting' ? '해당 모임' : modalProps.type === 'review' ? '해당 모임 후기' : '해당 호스트'} 신고를 취소하였습니다.`,
                );
              }}
              variant="tertiary"
              size="sm"
              className="w-30 border-gray-500 text-gray-600"
            >
              취소
            </Button>
            <Button disabled={!formState.isValid} className="flex-1">
              {`${modalProps.type === 'meeting' ? '모임' : modalProps.type === 'review' ? '모임 후기' : '호스트'} 신고하기`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
