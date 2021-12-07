import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

export function SignInButton() {

  const { data: session } = useSession();

  return session ? (
    <button 
      className={styles.signinbutton}
      type="button"
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361"/>
      { session.user.name || session.user.email }
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
    
  ) : (
    <button 
      className={styles.signinbutton}
      type="button"
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417"/>
      Sign in with GitHub
    </button>
  );
}