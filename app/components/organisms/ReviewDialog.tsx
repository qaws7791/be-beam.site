import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog/Dialog';
import { Button } from '@/components/atoms/button/Button';
import { Tag } from '@/components/atoms/tag/Tag';
import { Textarea } from '@/components/atoms/textarea/Textarea';
import RatingInput from '@/components/molecules/RatingInput';
import { ImageUploader } from '@/components/molecules/ImageUploader';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReviewSchema } from '@/schemas/reviews';

type MeetingType = 'regular' | 'small' | 'event';

type ReviewDialogProps = {
  meeting: {
    id: string | number;
    type: MeetingType;
    title: string;
    image: string;
  };
  onReviewSubmit: (review: {
    rating: number;
    content: string;
    images: File[];
  }) => void;
};

export function ReviewDialog({ meeting, onReviewSubmit }: ReviewDialogProps) {
  const { control, reset, handleSubmit, formState } = useForm<
    z.infer<typeof createReviewSchema>
  >({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 0,
      content: '',
      images: [],
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof createReviewSchema>) => {
    onReviewSubmit(data);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="w-full">
          ✍️후기 작성하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>후기 작성</DialogTitle>
          <DialogDescription className="sr-only">
            후기 작성하기
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <Tag variant={meeting.type === 'regular' ? 'blue' : 'primary'}>
              {meeting.type === 'regular' ? '정기모임' : '소모임'}
            </Tag>
            <div className="mt-3 flex items-center gap-2 border-b border-gray-300 pb-3">
              <img
                src={meeting.image}
                alt=""
                width={60}
                height={60}
                className="size-15 rounded-lg"
              />
              <p className="text-t3 text-gray-600">`{meeting.title}` 모임</p>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-6">
            <p className="text-center text-t2">참여한 모임은 어떠셨나요?</p>
            <div className="mt-5 flex justify-center">
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <RatingInput value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 border-b border-gray-300 pb-6">
            <p className="text-center text-t2">어떤점이 좋았나요?</p>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="h-36"
                  maxLength={100}
                  placeholder="이번 모임은 어땠나요? 즐거웠나요?&#10;소중한 경험을 함께 나눠요🥰"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text text-t2">
              사진으로 남기고 싶은 장면이 있었나요?
            </p>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  images={field.value}
                  onImagesChange={field.onChange}
                  maxImages={10}
                />
              )}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={!formState.isDirty || !formState.isValid}
              className="w-full"
            >
              작성 완료
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
