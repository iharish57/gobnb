import prisma from "@/app/libs/prismadb"

interface Iparams {
    listingId?:string;
    userId?:string;
    authorId?:string;
}

export default async function getReservations(params:Iparams) {
    const {listingId,userId,authorId} = params;
    try{

        const query:any ={};

        if (listingId) {
            query.listingId=listingId
        }

        if (userId) {
            query.userId=userId
        }

        if (authorId) {
            query.listing={userId:authorId}
        }

        const reservations = await prisma.reservation.findMany({
            where:query,
            include:{
                listing:true,
            },
            orderBy:{
                createdAt:'desc'
            }
        });

        const safeReservations =reservations.map(
            (reservations)=>({
                ...reservations,
                createdAt:reservations.createdAt.toISOString(),
                startDate:reservations.startDate.toISOString(),
                endDate:reservations.endDate.toDateString(),
                listing:{
                    ...reservations.listing,
                    createdAt:reservations.listing.createdAt.toString()
                }
            })
        );
        return safeReservations;
    }catch(error:any) {
        throw new Error(error)
    }
}