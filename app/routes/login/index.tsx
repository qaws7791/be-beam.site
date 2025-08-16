import { guestOnly } from '@/shared/.server/auth.server';

import LoginCard from '@/routes/login/_components/LoginCard';
import { metaTemplates } from '@/shared/config/meta-templates';
import type { Route } from '.react-router/types/app/routes/login/+types';
import { LoginTemplate } from '@/routes/login/_components/LoginTemplate';

export function meta() {
  return metaTemplates.login();
}

export async function loader({ request }: Route.LoaderArgs) {
  return guestOnly(request, '/');
}

export default function Login() {
  return (
    <LoginTemplate>
      <LoginCard />
    </LoginTemplate>
  );
}
