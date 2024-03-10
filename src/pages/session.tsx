import { useEffect } from 'react';
// import { verifySession } from '@/lib/auth';
import { AppwriteException } from 'appwrite';
import { useAuth } from '@/hooks/use-auth';
import useLocation from 'wouter/use-location';
import Container from '@/components/Container';

function Session() {
  const { verifySession } = useAuth();
  const [, navigate] = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');

    if (typeof userId !== 'string' || typeof secret !== 'string') {
      navigate('/login');
      return;
    }

    (async function run() {
      try {
        await verifySession({userId, secret});
        navigate('/');
      } catch (error) {
        if (error instanceof AppwriteException) {
          navigate(`/login?error=${error.type}`);
        }
      }
    })();
  }, []);

  return (
    <Container className="h-screen flex items-center justify-center text-center">
      <p>Logging you in...</p>
    </Container>
  )
}

export default Session;