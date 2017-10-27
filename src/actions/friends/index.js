/* -----------------------------------------
  actions
 ------------------------------------------*/

export const SET_FRIENDS = 'SET_FRIENDS';

/* -----------------------------------------
  action creators
 ------------------------------------------*/

// //////////////////
// Open Menu:
// //////////////////
export function setFriends(data) {
  return {
    type: SET_FRIENDS,
    data,
  };
}
