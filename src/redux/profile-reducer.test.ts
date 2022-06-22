import profileReducer, { actions } from "./profile-reducer";

let initialState = {
    profilePostData: [
        { id: 1, messagePost: 'my first post', likeCount: '54 likes' },
        { id: 2, messagePost: 'my second post', likeCount: '34 likes' },
    ],
    newPostText: 'first text',
    profile: null,
    status: ''
}

test('new post text must  change', () => {
    // 1. test data

    let action = actions.onPostChangeActionCreator('Hello Test')
   
    // 2. action
    let newState = profileReducer(initialState, action )  //передаем заранее спланированный стейт, и экшн
    // 3. expectation (ожидание)
    expect(newState.newPostText).toBe('Hello Test')
  });


test('length of post should be incremented', () => {
    // 1. test data

    let action = actions.btnAddPostActionCreator()
   
    // 2. action
    let newState = profileReducer(initialState, action )  //передаем заранее спланированный стейт, и экшн
    // 3. expectation (ожидание)
    expect(newState.profilePostData.length).toBe(3)
  });

  test('after deletion, the length of the array should decrease', () => {
    // 1. test data

    let action = actions.deletePostAC(1)
   
    // 2. action
    let newState = profileReducer(initialState, action )  //передаем заранее спланированный стейт, и экшн
    // 3. expectation (ожидание)
    expect(newState.profilePostData.length).toBe(1)
  });