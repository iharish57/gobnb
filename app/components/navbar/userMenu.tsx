'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisteModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/types"
import useRentModal from "@/app/hooks/useRentModal"
import { useRouter } from "next/navigation"

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu:React.FC<UserMenuProps> = ({
  currentUser
}) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    const [isopen, setIsopen] = useState(false);
    const router = useRouter()

    const toggleOpen = useCallback(()=>{
        setIsopen((value)=>!value);
    },[])

    const onRent = useCallback(()=>{
      if(!currentUser) {
        return loginModal.onOpen();
      }

      rentModal.onOpen();
    },[currentUser,loginModal,rentModal])
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
          <div
            onClick={onRent}
            className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
            "
          >
            Gobnb your home
          </div>
          <div
          onClick={toggleOpen}
            className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
            "
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
                <Avatar src={currentUser?.image}/>
            </div>
          </div>
      </div>
      {isopen && (
        <div
            className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
            "
        >
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={()=>router.push('/trips')}
                    label="My trips"
                  />
                  <MenuItem
                    onClick={()=>router.push('/favourites')}
                    label="My favourites"
                  />
                  <MenuItem
                    onClick={()=>router.push('/reservations')}
                    label="My reservations"
                  />
                  <MenuItem
                    onClick={()=>router.push('/properties')}
                    label="My properties"
                  />
                  <MenuItem
                    onClick={rentModal.onOpen}
                    label="Gobnb my home"
                  />
                  <hr/>
                  <MenuItem
                    onClick={()=>signOut()}
                    label="Logout"
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={loginModal.onOpen}
                    label="Login"
                  />
                  <MenuItem
                    onClick={registerModal.onOpen}
                    label="Sign up"
                  />
                </>
              )}
            </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu