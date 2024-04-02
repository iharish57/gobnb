'react'

import Heading from "../components/Heading";
import Container from "../components/container";
import ListingCard from "../components/listings/ListingCard";
import { SafeListings, SafeUser } from "../types"

interface FavouritesClientProps {
  listings:SafeListings[];
  currentUser?:SafeUser | null
}

const FavouritesClient:React.FC<FavouritesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
  <Container>
    <Heading
      title="Favourite"
      subtitle="Your favourite listings"
    />
    <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
        >
            {listings.map((listing)=>(
                <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                />
            ))}
        </div>
  </Container>
  )
}

export default FavouritesClient
