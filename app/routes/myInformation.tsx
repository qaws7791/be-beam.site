import { z } from 'zod';
import useMyInfoQuery from '@/hooks/api/useMyInfoQuery';
import useUpdateMyInfoMutation from '@/hooks/api/useUpdateMyInfoMutation';
import { myInfoSchema } from '@/hooks/business/useMyInfoForm';
import { metaTemplates } from '@/config/meta-templates';
import toast from 'react-hot-toast';
import UserInformationForm from '@/components/organisms/UserInformationForm';

export function meta() {
  return metaTemplates.myInformation();
}

export default function MyInformation() {
  const myinfoQuery = useMyInfoQuery();
  const updateMyInfoMutation = useUpdateMyInfoMutation();

  const onSubmit = (data: z.infer<typeof myInfoSchema>) => {
    const mutationData = {
      name: data.name,
      phoneNumber: data.phoneNumber
        ? data.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
        : null,
      email: data.email,
      birthday: data.birthday ? data.birthday.replaceAll('.', '-') : null,
      gender: data.gender === '남성' ? '남성' : ('여성' as '남성' | '여성'),
      terms: data.terms,
      userTerms: data.userTerms,
      marketingTerms: data.marketingTerms,
    };

    updateMyInfoMutation.mutate(mutationData, {
      onSuccess: () => {
        toast.success('개인정보 수정이 완료되었습니다.');
      },
      onError: () => {
        toast.error('개인정보 수정이 실패되었습니다.');
      },
    });
  };

  return (
    <div className="flex-1">
      {/* 헤더 */}
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2 text-gray-950">개인정보 수정</h1>
        <div className="flex w-fit items-center rounded-lg bg-gray-200 p-2">
          <p className="text-b3 text-gray-600">
            📢 하단 정보는 본인 확인 및 마케팅 수신 서비스에 사용되며, 절대로
            프로필에 공개되지 않습니다.
          </p>
        </div>
      </div>
      {/* 개인정보 수정 폼 */}
      <div className="mt-8">
        {myinfoQuery.data && (
          <UserInformationForm
            information={{
              ...myinfoQuery.data,
              gender: myinfoQuery.data.gender || null,
            }}
            onSubmit={onSubmit}
          />
        )}
      </div>
      {/* 회원 탈퇴 */}
      <div className="mt-8">
        <button className="text-b3 text-gray-700 underline">회원 탈퇴</button>
      </div>
    </div>
  );
}
