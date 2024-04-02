'use client'

import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavourite {
    listingId:string;
    currentUser?:SafeUser | null;
}

const useFavourite = ({
    listingId,
    currentUser
}:IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hashFavourited = useMemo(()=>{
        const list = currentUser?.favouritesIds || [];

        return list.includes(listingId);
    },[currentUser,listingId])

    const toggleFavourite = useCallback(async(
        e:React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();
        if(!currentUser){
            return loginModal.onOpen();
        }
        try{
            let request;

            if (hashFavourited) {
                request=()=> axios.delete(`/api/favourites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`)
            }

            await request();
            router.refresh();
            toast.success('Success')

        } catch (error){
            toast.error('Something went wrong.')
        }
    },[hashFavourited, loginModal,currentUser,listingId,router])

    return {
        hashFavourited,
        toggleFavourite
    }
}

export default useFavourite;