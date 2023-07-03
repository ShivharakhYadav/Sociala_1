import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
// import { newPostURL } from '../services/Links';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSelector } from 'react-redux';
import { newPostURL } from '../Api Services/Links';
// Import Swiper styles


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const breakpoints = {
    320: {
        slidesPerView: 1,
        spaceBetween: 0,
    },
    480: {
        slidesPerView: 1,
        spaceBetween: 0,
    },
    640: {
        slidesPerView: 1,
        spaceBetween: 0,
    },
    992: {
        slidesPerView: 1,
        spaceBetween: 0,
    },
    1200: {
        slidesPerView: 1,
        spaceBetween: 0,
    },
};

interface newPost {
    files: Array<Blob>,
    caption: string
}
export default function BasicModal() {
    const providerState = useSelector((state: any) => state?.providerReducer?.user);
    const [open, setOpen] = useState<boolean>(true);
    const handleClose = () => setOpen(false);
    const [displayImage, setDisplayImage] = useState<Array<string>>([]);
    const [activeScreen, setActiveScreen] = useState(1);
    const [postBody, setPostBody] = useState<newPost>({
        files: [],
        caption: ""
    })

    async function handleFileSelect(e: any) {
        let htmlImageDisplay: Array<string> = [];
        let fileArray = e.target.files;
        for (let i = 0; i < fileArray.length; i++) {
            let convertedBase64: any = await convertToBase64(e.target.files[i])
            if (convertedBase64) {
                htmlImageDisplay.push(convertedBase64);
            }
        }

        if (htmlImageDisplay.length > 0) {
            setPostBody({ ...postBody, files: fileArray })
            setDisplayImage(htmlImageDisplay);
        }
    }

    const handleSubmit = async () => {
        try {
            let id = providerState._id;
            let formData = new FormData();

            if (postBody?.files?.length > 0) {
                for (let i = 0; i < postBody.files.length; i++) {
                    formData.append('img', postBody.files[i])
                }
            }

            for (const [key, value] of Object.entries(postBody)) {
                if (typeof (value) == "string") {
                    formData.append(key, postBody?.caption);
                }
            }

            const url = `${newPostURL}?userid=${id}&postcount={${postBody.files.length}}`;
            let response = await fetch(url, { method: "POST", body: formData });
            let result = await response.json();
            if (result.success) {
                handleClose();
            }
            console.log('---result', result);
        } catch (err) {
            console.log('err in next', err);
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {activeScreen == 1 && <TextField variant='filled' type={'file'} onChange={handleFileSelect} inputProps={{ multiple: true }} onClick={(e: any) => e.target.value = null} />}
                    <div>
                        {
                            activeScreen == 1 && <>
                                {
                                    (displayImage?.length > 0 && displayImage) && <div>
                                        {DisplayDomImage(displayImage)}
                                        <br />
                                    </div>
                                }
                                {displayImage?.length > 0 && <Button variant='contained' onClick={() => setActiveScreen(2)}>Next</Button>}
                            </>
                        }
                    </div>
                    <br />
                    <div>
                        {activeScreen == 2 && <>
                            <Box>
                                <img alt='img' src={displayImage[0]} width='20%' />
                            </Box>
                            <TextField
                                variant='outlined'
                                placeholder='caption'
                                value={postBody?.caption}
                                onChange={(e: any) => { setPostBody({ ...postBody, caption: e.target.value }) }} />
                            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                        </>
                        }

                    </div>
                </Box>
            </Modal>
        </div>
    );
}

function DisplayDomImage(images: Array<String>) {
    return <Swiper
        breakpoints={breakpoints}
        speed={300}
        slidesPerView="auto"
        slidesPerGroup={1}
        loop={images.length > 1 ? true : false}
        pagination={{
            clickable: true,
        }}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        navigation={images.length > 1 ? true : false}
        modules={[Pagination, Navigation]}
    >
        {images.map((singleImages: any, i: any) => {
            return <SwiperSlide key={i}>
                <img height={'200px'} title={`${i}`} alt={`${i}`} src={singleImages} />
            </SwiperSlide>
        })}
    </Swiper>
}

const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

// import { Box, TextField, Typography } from '@mui/material';
// import { useState } from 'react'
// import { useSelector } from 'react-redux';
// import { newPostURL } from '../services/Links';

// function NewPost() {
//     const providerState = useSelector((state: any) => state?.providerReducer?.user);
//     const [img, setimg] = useState([]);
//     const [imgsend, setImgSend] = useState()
//     const arr: any = [];

//     async function handleFileSelect(e: any) {
//         let fileArray = e.target.files;
//         for (let i = 0; i < fileArray.length; i++) {
//             arr.push(await convertToBase64(e.target.files[i]))
//         }
//         setimg(arr);
//         setImgSend(e.target.files[0]);
//     }

//     const addPost = async () => {
//         let id = providerState._id;
//         let data: any = new FormData();

//         data.append("img", imgsend);
//         try {
//             const url = `${newPostURL}?userid=${id}`
//             fetch(url, {
//                 method: "POST",
//                 body: data
//             }).then((response: any) => response.text().then((result: any) => { console.log("result") }))
//             //let _result = await response.text();
//         }
//         catch (err) { console.log("Upload Fails", err) }

//     }
//     return (
//         <Box>
//             <Typography variant='h2'>No selected Files</Typography>
//             <TextField variant='filled' type={'file'} onChange={handleFileSelect} />
//             <br />
//             {
//                 img.map((item, i) => {
//                     return <div key={i}>
//                         <img style={{ height: '200px', width: '200px' }} title={`${i}`} alt={`${i}`} src={item} />
//                     </div>
//                 })
//             }
//             <br />
//             <button onClick={() => addPost()}>Add Post</button>
//         </Box>
//     )
// }
// export default NewPost;

// const convertToBase64 = (file: any) => {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(file);
//         fileReader.onload = () => {
//             resolve(fileReader.result);
//         };
//         fileReader.onerror = (error) => {
//             reject(error);
//         };
//     });
// };