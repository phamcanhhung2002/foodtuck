import { useSelector } from 'react-redux';
import { selectIsUserLoading, selectUserFromUserState } from '../../state/user/user-selector';
import Spinner from '../../components/Spinner';

const AccountItem = () => {
  const userData = useSelector(selectUserFromUserState);
  const loading = useSelector(selectIsUserLoading)

  return (
   <>
    {loading ? (
      <Spinner/>
    ) : (
      <p className='text-xl text-center'>Hello {userData?.firstName} {userData?.lastName}!</p>
    )}
   </>
  )
}

export default AccountItem