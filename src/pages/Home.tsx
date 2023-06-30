import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import PostCard from '../Components/PostCard';
import { Stack } from '@mui/material';
import providerActions from '../store/actions/provider/actions';
import providersConstant from '../store/actions/provider/actionTypes';
import PostCard from '../components/PostCard';
import { userDataType } from '../store/reducers/provider/providerReducer';
import { stateTypes } from '../Types/types';

// import { postRequest } from '../services/Services'
// import { followPostURL, baseURL } from '../services/Links';
// import io from 'socket.io-client';

function Home() {
    console.log()
    const user = useSelector((state: stateTypes) => state?.providerReducer?.user);

    // console.log('---userDetails', userDetails)
    // let dispatch = useDispatch();

    // useEffect(() => {
    //     console.log('called uyseEffectc')
    //     if (userDetails?.user?.followings?.length > 0) {
    //         (async () => {
    //             try {
    //                 let body = { followings: userDetails.user.followings }
    //                 // let result = await postRequest(followPostURL, "", body);
    //                 // console.log('result-----------', result)
    //                 // if (result.success) {
    //                 //     dispatch(providerActions.add_post(result.data));
    //                 // }
    //             }
    //             catch (err) {
    //                 console.log(err);
    //             }
    //         })()
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userDetails?.user?.followings])

    return (
        <Stack alignItems="center" spacing={3} paddingTop={"64px"}>
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