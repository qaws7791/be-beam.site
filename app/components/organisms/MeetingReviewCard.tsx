// 현재 smart 패턴 컴포넌트로 동작. 후에 smart 컴포넌트를 분리시킬지 고민(dumb 디렉토리에 위치)

import { useEffect, useState } from 'react';
import { readFileAsBase64 } from '@/utils/file';

import MeetingReviewCardHeader from '../molecules/MeetingReviewCardHeader';
import { Button } from '../atoms/button/Button';
import MeetingReviewEditForm from './MeetingReviewEditForm';
import MeetingReviewContent from './MeetingRevirewContent';

export interface MeetingReviewType {
  id: number;
  reviewId: number;
  profileImg: string;
  nickname: string;
  createdAt: string;
  rating: number;
  images: string[];
  text: string;
  likesCount: number;
  myReview?: boolean;
  liked?: boolean;
}

interface EditType {
  isActive: boolean;
  id: number | null;
}

export interface EditDataType {
  rating: number;
  text: string;
  existingImages: string[];
}

export default function MeetingReviewCard({
  review,
  meetingReviewList,
}: {
  review: MeetingReviewType;
  meetingReviewList: MeetingReviewType[];
}) {
  // 수정할 모임 후기
  const [edit, setEdit] = useState<EditType>({ isActive: false, id: null });
  // 수정할 모임 후기의 기존 값
  const [editData, setEditData] = useState<EditDataType>({
    rating: 0,
    text: '',
    // 기존 이미지
    existingImages: [],
  });
  // 모든 전체 이미지: 화면에 이미지를 보여줄 때 사용
  const [totalEditImages, setTotalEditImages] = useState<string[]>([]);

  const isMyMeetingReviewEdit = edit.isActive && review.reviewId === edit.id;

  useEffect(() => {
    if (edit.isActive && review.reviewId === edit.id) {
      const origin = meetingReviewList.find((r) => r.reviewId === edit.id);
      if (origin) {
        setEditData({
          rating: origin.rating,
          text: origin.text,
          existingImages: origin.images,
        });
        setTotalEditImages(origin.images);
      }
    }
  }, [edit, review.reviewId, meetingReviewList]);

  return (
    <div
      key={review.id}
      className="mb-4 w-full rounded-2xl border-1 border-gray-300 p-8"
    >
      <MeetingReviewCardHeader
        edit={edit}
        review={review}
        onEditMeetingReview={() => {
          setEdit({ isActive: true, id: review.reviewId });
        }}
        onDeleteMeetingReview={() => console.log('삭제')}
        onDeclareMeetingReview={() => console.log('신고')}
      />

      <div className="mt-4 w-full">
        {isMyMeetingReviewEdit ? (
          <MeetingReviewEditForm
            rating={review.rating}
            text={editData.text}
            totalEditImages={totalEditImages}
            onRatingChange={(value) => {
              setEditData((prev) => ({ ...prev, rating: value }));
            }}
            onTextChange={(e) =>
              setEditData((prev) => ({ ...prev, text: e.target.value }))
            }
            onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (totalEditImages.length < 10) {
                if (!e.target.files) return;

                const files = Array.from(e.target.files).slice(
                  0,
                  10 - totalEditImages.length,
                );

                Promise.all(files.map(readFileAsBase64)).then(
                  (base64Images) => {
                    setTotalEditImages((prev) => [...prev, ...base64Images]);
                  },
                );

                e.target.value = '';
              }
            }}
            onCancelEditMeetigReview={() =>
              setEdit({ isActive: false, id: null })
            }
            setEditData={setEditData}
            setTotalEditImages={setTotalEditImages}
          />
        ) : (
          <MeetingReviewContent review={review} />
        )}
      </div>

      <Button
        variant="tertiary"
        className="mt-8 h-10 min-w-31 rounded-full border-gray-300 text-t4 text-gray-500"
      >
        <img
          className="h-6 w-6"
          src={
            review.liked
              ? '/images/icons/fill_like.svg'
              : '/images/icons/like.svg'
          }
          alt="like_icon"
        />
        좋아요 | {review.likesCount}
      </Button>
    </div>
  );
}
