
import styles from "./users.module.css"
import * as axios from "axios";
import userPhoto from '../../assets/images/219986.png'




const Users = (props) => {
    let getUsers = () =>  {
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then(response => {
             props.setUsers(response.data.items)
        })
    }
}
    

        // props.setUsers([
        //     { id: 1, followed: true, avatar: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg', fullName: 'Vitalii', status: 'I am a programmer', location: { city: 'Kyiv', country: 'Ukraine' } },
        //     { id: 2, followed: false, avatar: 'https://klike.net/uploads/posts/2019-03/1551511825_12.jpg', fullName: 'Victor', status: 'I am a engenier', location: { city: 'Chernivtsi', country: 'Ukraine' } },
        //     { id: 3, followed: true, avatar: 'https://www.meme-arsenal.com/memes/be50e6ba99654b5455027dcc82beb5b3.jpg', fullName: 'Artur', status: 'I don\'nt work', location: { city: 'Seattle', country: 'USA' } },
        //     { id: 4, followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmaZgLLANRqjbr5CbgIQ0zV54gB7xMkraHg&usqp=CAU', fullName: 'Nikolay', status: 'I have a dog', location: { city: 'Sumy', country: 'Ukraine' } }
        // ])
    
    
    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>

                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userAvatar} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.follow(u.id) }}>Follow</button>
                            : <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users