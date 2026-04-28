import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminPage from '@/src/modules/admin/AdminPage';

export const runtime = 'nodejs';

export default async function Admin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/');
  }

  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64url').toString(),
    );

    if (payload.role !== 'ADMIN') {
      redirect('/');
    }
  } catch (error) {
    redirect('/');
  }

  return <AdminPage />;
}
