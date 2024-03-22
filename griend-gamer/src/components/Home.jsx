import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/apiService';


export default function Home() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsers();
                setUsers(users);
            } catch (error) {
                console.error(error)
            }
        }

        fetchUsers();
    }, [])




    return (
        <div className='container px-2 mx-auto'>
            <h2 className="main-h2">Users</h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2 content-center">

                {users && (
                    <>
                        {users.map((user, index) => (

                            <div class="card w-full md:w-96  ">
                                <div class="card-body ">
                                    <h2 class="card-title">{user.name}</h2>
                                    <p>{user.address.street}<br />{user.address.city}</p>
                                    <div class="card-actions justify-end">
                                        <button class="btn btn-primary">View Location</button>
                                    </div>
                                </div>
                            </div>

                        )
                        )}
                    </>
                )}

            </div>



        </div>
    )
}
