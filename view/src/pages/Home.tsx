import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../globalState/authContext';
import { ROUTES } from '../utils/constants';

function Home() {
  const [user] = useContext(AuthContext);

  if (!user) {
    return <Redirect to={ROUTES.login} />;
  }

  return <div>This is the Home page</div>;
}

export default Home;
