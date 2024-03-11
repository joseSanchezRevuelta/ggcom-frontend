import { useEffect, useState } from "react"
import DeleteUser from '../DeleteUser/DeleteUser.jsx'
import EditUsernameModal from "../EditUsernameModal/EditUsernameModal.jsx"
import EditEmailModal from "../EdirEmailModal/EditEmailModal.jsx"
import EditPasswordlModal from "../EditPasswordModal/EditPasswordModal.jsx"

// eslint-disable-next-line react/prop-types
export default function EditProfile({ user_id, user_name, user_email }) {
    const [userId, setUserId] = useState(user_id)
    const [userNameState, setUserNameState] = useState(user_name)
    const [userEmailState, setUserEmailState] = useState(user_email)
    const [passwordState, setPasswordState] = useState('')

    const [openEditUsernameModal, setOpenEditUsernameModal] = useState(false);
    const [openEditEmailModal, setOpenEditEmailModal] = useState(false);
    const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
    // const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);

    // function handleUpdate(userId) {

    // }

    // function handleDelete(userId) {

    // }

    return (
        <>
            <EditUsernameModal openEditUsernameModal={openEditUsernameModal} setOpenEditUsernameModal={setOpenEditUsernameModal} userNameState={userNameState} user_id={user_id}  email={userEmailState} setUserNameState={setUserNameState}/>
            <EditEmailModal openEditEmailModal={openEditEmailModal} setOpenEditEmailModal={setOpenEditEmailModal} userEmailState={userEmailState} user_id={user_id} username={userNameState} setUserEmailState={setUserEmailState}/>
            <EditPasswordlModal openEditPasswordModal={openEditPasswordModal} setOpenEditPasswordModal={setOpenEditPasswordModal} passwordState={passwordState} user_id={user_id} />
            <DeleteUser openDeleteUser={openDeleteUser} setOpenDeleteUser={setOpenDeleteUser} user_id={user_id} />

            <div className="relative flex justify-center lg:w-4/6 w-full mx-auto mb-10 border border-main rounded bg-neutral-950">
                {/* <form className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8"> */}
                <div className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8">
                    {/* <p id="error_signin" className="error_signin text-main2 text-sm text-center font-semibold mb-6">{error}</p> */}
                    <div className="relative z-0 w-full mt-6 mb-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Username
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{userNameState}</span>
                            <button className="w-24 text-white bg-indigo-600 font-bold hover:bg-transparent border border-main focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-main dark:hover:bg-transparent dark:focus:ring-violet-900" onClick={() => setOpenEditUsernameModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <hr></hr>
                    <div className="relative z-0 w-full mt-6 mb-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Email
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{userEmailState}</span>
                            <button className="w-24 text-white bg-indigo-600 font-bold hover:bg-transparent border border-main focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-main dark:hover:bg-transparent dark:focus:ring-violet-900" onClick={() => setOpenEditEmailModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <hr></hr>
                    <div className="relative z-0 w-full mt-6 mb-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Password
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">pa********rd</span>
                            <button className="w-24 text-white bg-indigo-600 font-bold hover:bg-transparent border border-main focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-main dark:hover:bg-transparent dark:focus:ring-violet-900" onClick={() => setOpenEditPasswordModal(true)}>Edit</button>
                        </div>
                    </div>
                    <hr></hr>
                    {/* <div className="text-center mt-12">
                        <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={() => setOpenEditPasswordModal(true)}>Change password</button>
                    </div> */}
                    <div className="text-center mt-14">
                        <button className="text-white bg-transparent border border-main font-bold hover:bg-red-600 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center dark:focus:ring-violet-900" onClick={() => setOpenDeleteUser(true)}>Do you want to delete this account?</button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </>
    )
}