import Text from '../atoms/text/Text';
import type { UserType } from '@/types/commons';

export default function UserProfileCard({ user }: { user: UserType }) {
  return (
    <div className="box-border flex w-full flex-col items-center rounded-2xl border-1 border-[var(--color-gray-300)] p-5">
      <img
        className="h-12 w-12 rounded-full"
        src={user.profileImg}
        alt="profile_img"
      />
      <Text variant="T2_Semibold" className="mt-4">
        {user.nickName}
      </Text>

      <button className="mt-6 cursor-pointer rounded-lg border-1 border-[var(--color-gray-300)] px-5 py-3">
        <Text variant="B3_Regular">프로필 보기</Text>
      </button>
    </div>
  );
}
