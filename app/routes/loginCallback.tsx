import { redirect } from 'react-router';

export function clientLoader() {
  return redirect('/');
}

export default function LoginCallback() {
  return <div>로그인 콜백</div>;
}
