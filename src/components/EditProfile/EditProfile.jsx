import { useEffect, useState } from "react"
import DeleteUser from '../DeleteUser/DeleteUser.jsx'

// eslint-disable-next-line react/prop-types
export default function EditProfile({ user_id, user_name, user_email }) {
    const [userId, setUserId] = useState(user_id)
    const [userNameState, setUserNameState] = useState(user_name)
    const [userEmailState, setUserEmailState] = useState(user_email)

    const [openDeleteUser, setOpenDeleteUser] = useState(false);

    // function handleUpdate(userId) {

    // }

    // function handleDelete(userId) {

    // }

    return (
        <>
            <DeleteUser openDeleteUser={openDeleteUser} setOpenDeleteUser={setOpenDeleteUser} />

            <div className="relative flex justify-center lg:w-4/6 w-full mx-auto border border-main rounded">
                {/* <form className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8"> */}
                <div className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8">
                    {/* <p id="error_signin" className="error_signin text-main2 text-sm text-center font-semibold mb-6">{error}</p> */}
                    <div className="relative z-0 w-full my-4 group">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Username
                        </label>
                        <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        {/* <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <div className="relative z-0 w-full my-4 group">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Email
                        </label>
                        <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userEmailState} onChange={(e) => setUserEmailState(e.target.value)} />
                        {/* <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <div className="text-center mt-12">
                        <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900">Update user</button>
                    </div>
                    <div className="text-center mt-12">
                        <button className="text-white bg-red-500 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-5/6 px-5 py-2.5 text-center dark:focus:ring-violet-900" onClick={() => setOpenDeleteUser(true)}>Delete user</button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </>
    )
}