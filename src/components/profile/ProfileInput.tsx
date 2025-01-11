interface IProfileInput {
    placeholder: string 
}

function ProfileInput({placeholder}: IProfileInput) {
    return   <input
    type="text"
    placeholder={placeholder}
    className="text-body2 px-2 py-[.6rem] rounded-[.4rem] placeholder:text-gray-100 text-gray-500 bg-gray-30 border border-solid border-gray-100"
  />
}

export default ProfileInput