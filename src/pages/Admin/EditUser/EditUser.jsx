import { useEffect, useState } from "react"
import EditUsernameModal from "../../../components/EditUsernameModal/EditUsernameModal.jsx"
import EditEmailModal from "../../../components/EdirEmailModal/EditEmailModal.jsx"
import EditPasswordlModal from "../../../components/EditPasswordModal/EditPasswordModal.jsx"
import { Link, useParams } from "react-router-dom"
import DeleteUser from "../../../components/DeleteUser/DeleteUser.jsx"
import Title from "../../../components/Title/Title.jsx"
import EditRoleModal from "../../../componentsAdmin/EditRoleModal/EditRoleModal.jsx"

// eslint-disable-next-line react/prop-types
export default function EditUser() {

    const { id, username, email, role } = useParams();
    const [userId, setUserId] = useState(id)
    const [userNameState, setUserNameState] = useState(username)
    const [userEmailState, setUserEmailState] = useState(email)
    const [passwordState, setPasswordState] = useState('')
    const [roleState, setRoleState] = useState(role)

    const [openEditUsernameModal, setOpenEditUsernameModal] = useState(false);
    const [openEditEmailModal, setOpenEditEmailModal] = useState(false);
    const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
    const [openEditRoleModal, setOpenEditRoleModal] = useState(false);
    // const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);

    function handleViewCommunities(token, id) {

    }

    return (
        <>
            <EditUsernameModal openEditUsernameModal={openEditUsernameModal} setOpenEditUsernameModal={setOpenEditUsernameModal} userNameState={userNameState} user_id={id} email={email} setUserNameState={setUserNameState} />
            <EditEmailModal openEditEmailModal={openEditEmailModal} setOpenEditEmailModal={setOpenEditEmailModal} userEmailState={userEmailState} user_id={id} username={username} setUserEmailState={setUserEmailState} />
            <EditPasswordlModal openEditPasswordModal={openEditPasswordModal} setOpenEditPasswordModal={setOpenEditPasswordModal} passwordState={passwordState} user_id={id} />
            <EditRoleModal openEditRoleModal={openEditRoleModal} setOpenEditRoleModal={setOpenEditRoleModal} user_id={id} roleState={roleState} setRoleState={setRoleState}/>
            <DeleteUser openDeleteUser={openDeleteUser} setOpenDeleteUser={setOpenDeleteUser} user_id={id} />

            <Title title={'Edit user'} subtitle='' />
            <div className="relative flex justify-center lg:w-4/6 w-full mx-auto border border-main rounded">
                {/* <form className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8"> */}
                <div className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8">
                    {/* <p id="error_signin" className="error_signin text-main2 text-sm text-center font-semibold mb-6">{error}</p> */}
                    <div className="relative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Username
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{userNameState}</span>
                            <button className="w-24 text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={() => setOpenEditUsernameModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <hr></hr>
                    <div className="relative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Email
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{userEmailState}</span>
                            <button className="w-24 text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={() => setOpenEditEmailModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <hr></hr>
                    <div className="elative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Password
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">pa********rd</span>
                            <button className="w-24 text-white bg-indigo-600 font-bold hover:bg-transparent border border-main focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-main dark:hover:bg-transparent dark:focus:ring-violet-900" onClick={() => setOpenEditPasswordModal(true)}>Edit</button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="elative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Role
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{roleState}</span>
                            <button className="w-24 text-white bg-indigo-600 font-bold hover:bg-transparent border border-main focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-main dark:hover:bg-transparent dark:focus:ring-violet-900" onClick={() => setOpenEditRoleModal(true)}>Edit</button>
                        </div>
                    </div>
                    {/* <div className="text-center mt-12">
                        <Link to={`/communitieslist/${id}/${username}/${email}`} className="text-white bg-yellow-400 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-violet-700 dark:focus:ring-violet-900">
                            View communities user
                        </Link>
                    </div> */}
                    <div className="text-center mt-12">
                        <Link to={`/commentslist/${id}`} className="text-white bg-yellow-400 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-violet-700 dark:focus:ring-violet-900">View comments user</Link>
                    </div>
                    {/* <div className="text-center mt-12">
                        <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={() => setOpenEditPasswordModal(true)}>Change password</button>
                    </div> */}
                    <div className="text-center mt-12">
                        <button className="text-white bg-red-500 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center dark:focus:ring-violet-900" onClick={() => setOpenDeleteUser(true)}>Delete user</button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </>
    )
}