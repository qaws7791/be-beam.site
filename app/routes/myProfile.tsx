import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { Label } from '@/components/atoms/label/Label';
import { Textarea } from '@/components/atoms/textarea/Textarea';
import useMyProfileQuery from '@/hooks/api/useMyProfileQuery';
import { z } from 'zod';
import { Controller } from 'react-hook-form';
import ProfileImageInput from '@/components/atoms/ProfileImageInput';
import type { profileFormSchema } from '@/hooks/business/useProfileForm';
import useProfileForm from '@/hooks/business/useProfileForm';
import useUpdateProfileMutation from '@/hooks/api/useUpdateProfileMutation';
import { FormMessage } from '@/components/atoms/form/FormMessage';
import { metaTemplates } from '@/config/meta-templates';

export function meta() {
  return metaTemplates.myProfile();
}

export default function MyProfile() {
  const myProfile = useMyProfileQuery();
  const form = useProfileForm({
    defaultValues: {
      nickname: myProfile.data?.nickname,
      introduction: myProfile.data?.introduction,
    },
  });
  const updateProfileMutation = useUpdateProfileMutation();

  const onSubmit = (data: z.infer<typeof profileFormSchema>) => {
    console.log(data);
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="max-w-[800px] flex-1">
      {/* 헤더 */}
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2 text-gray-950">프로필 정보</h1>
        <div className="w-fit rounded-lg bg-gray-200 p-2">
          <p className="text-b3 text-gray-600">
            👋 나를 가장 잘 나타내는 키워드로 한 줄 소개를 완성해 보세요.
          </p>
        </div>
      </div>
      {/* 프로필 수정 폼 */}
      <form
        className="mt-8 flex flex-col gap-7"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative w-fit">
          <Controller
            name="profileImage"
            control={form.control}
            render={({ field }) => (
              <ProfileImageInput
                image={field.value}
                onImageChange={field.onChange}
                defaultImage={myProfile.data?.profileImage}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="nickname">닉네임</Label>
          <Input id="nickname" {...form.register('nickname')} />
          {form.formState.errors.nickname && (
            <FormMessage variant="error">
              {form.formState.errors.nickname.message}
            </FormMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="introduction">한 줄 소개</Label>
          <Textarea id="introduction" {...form.register('introduction')} />
          {form.formState.errors.introduction && (
            <FormMessage variant="error">
              {form.formState.errors.introduction.message}
            </FormMessage>
          )}
        </div>
        <Button size="lg" type="submit">
          정보 수정
        </Button>
      </form>
    </div>
  );
}
