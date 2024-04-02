import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"
import { error } from "console";

export default async function getFavoriteListings(){
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return [];
        }

        const favourites = await prisma.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser.favouritesIds || [])]
                }
            }
        });

        const safeFavourites = favourites.map((favourite)=>({
            ...favourite,
            createdAt: favourite.createdAt.toISOString()
        }));

        return safeFavourites;
    } catch (error:any){
        throw new Error(error)
    }
}