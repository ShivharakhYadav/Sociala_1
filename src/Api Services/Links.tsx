export const baseURL = 'http://localhost:4100';

const authURL = `${baseURL}/auth/`;

/*
Auth URL Start
*/
export const loginURL = `${authURL}login`;
export const registerURL = `${authURL}register`;
/*
Auth URL End
 */

const accountURL = `${baseURL}/account/`;

/*
 * User URL Start
 */
export const singleRecordURL = `${accountURL}user/`;
export const searchUserURL = `${accountURL}search/`;
export const updateUserURL = `${accountURL}update/`;
export const uploadNewPostURL = `${accountURL}upload/`;
export const notificationURL = `${accountURL}changeNotificationStatus/`;
/*
* User URL Start
*/


const postURL = `${baseURL}/post/`;

/*
Post URL Start
*/
export const newPostURL = `${postURL}newpost`;
export const followPostURL = `${postURL}userspost/`;
export const commentURL = `${postURL}comment/`;
export const replyURL = `${postURL}reply/`;
/*
Post URL Start
 */