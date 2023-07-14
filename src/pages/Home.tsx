import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import PostCard from '../Components/PostCard';
import { Stack } from '@mui/material';
import providerActions from '../store/actions/provider/actions';
import providersConstant from '../store/actions/provider/actionTypes';
import PostCard from '../components/PostCard';
import { UserDataType } from '../store/reducers/provider/providerReducer';
import { stateTypes } from '../Types/types';
import { getLatestPost } from '../Api Services/PostServices';

// import { postRequest } from '../services/Services'
// import { followPostURL, baseURL } from '../services/Links';
// import io from 'socket.io-client';

function Home() {
    let dispatch = useDispatch();
    const user = useSelector((state: stateTypes) => state?.providerReducer?.user);
    console.log('---userDetails', user)

    useEffect(() => {
        console.log('called uyseEffectc')
        if (user?.followings?.length > 0) {
            (async () => {
                try {
                    let body = { followings: user.followings }
                    const result = await getLatestPost(body);
                    console.log("result result", result);

                    // let result = await postRequest(followPostURL, "", body);
                    // console.log('result-----------', result)
                    if (result.success && result?.data?.length > 0) {
                        dispatch(providerActions.add_post(result.data));
                    }
                }
                catch (err) {
                    console.log(err);
                }
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.followings])

    return (
        <Stack alignItems="center" spacing={3} >
            {
                user?.post?.length > 0 ? <>
                    {user?.post?.map((post: any, i: any) => {
                        return <PostCard post={post} userDetails={user} key={`${post?.userid}${post?.username}${i}`} />
                    })}
                </>
                    : <h1>No Post Available</h1>
            }
        </Stack>
    )
}
export default Home;