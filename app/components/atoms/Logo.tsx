import { useNavigate } from 'react-router';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate('/');
      }}
      className="cursor-pointer text-2xl text-[#FF9742]"
    >
      LOGooo
    </div>
  );
}
