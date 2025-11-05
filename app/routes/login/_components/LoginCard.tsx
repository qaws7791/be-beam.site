import { KakaoLoginButton } from '@/features/auth/components/KakaoLoginButton';
import Logo from '../../../shared/components/ui/Logo';
import Text from '../../../shared/components/ui/Text';

export default function LoginCard() {
  return (
    <div className="mx-4 flex w-full max-w-[730px] flex-col items-center rounded-3xl border-0 border-gray-200 bg-white p-8 text-center md:border-2 md:p-32">
      <Logo variant="auth" />

      <Text variant="H1_Bold" className="mt-6">
        연결망을 통한 따뜻한 사회로.
      </Text>
      <Text variant="H1_Bold">OO</Text>

      <KakaoLoginButton />
    </div>
  );
}
