'use client'

import useCountrie from "@/app/hooks/useCountrie";
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import Map from "../Map";

const map = dynamic(()=>import('../Map'),{
    ssr:false
})

interface ListingInfoProps {
    user:SafeUser;
    guestCount:number;
    roomCount:number;
    bathroomCount:number;
    description:string;
    category:{
        icon:IconType;
        label:string;
        description:string;
    } | undefined
    locationValue:string;
}
const ListingInfo:React.FC<ListingInfoProps> = ({
    description,
    user,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const {getByValue} = useCountrie();
    const coordinates = getByValue(locationValue)?.latlng;
  return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="
                    text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                ">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image}/>
                </div>
                <div
                className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    font-light
                    text-neutral-500
                "
                >
                    <div>
                        {guestCount} guests
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    description={category.description}
                    label={category.label}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr/>
            <Map center={coordinates} />
        </div>
  )
}

export default ListingInfo
