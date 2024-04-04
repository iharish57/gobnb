'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import queryString from 'query-string'
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import { latLng } from 'leaflet'
import Calender from '../inputs/Calender'
import Counter from '../inputs/Counter'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModals = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setlocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate:new Date(),
    endDate:new Date(),
    key:'selection'
  });

  const Map = useMemo(()=>dynamic(()=>import('../Map'),{
    ssr:false
  }),[]);

  const onBack = useCallback(
    () => {
      setStep((value)=> value - 1)
    },
    [],
  )

  const onNext = useCallback(
    () => {
      setStep((value)=> value + 1)
    },
    [],
  )
  
  const onSubmit = useCallback(async ()=>{
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updateQuery:any = {
      ...currentQuery,
      locationValue:location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };

    if(dateRange.startDate){
      updateQuery.startDate = formatISO(dateRange.startDate)
    }

    if(dateRange.endDate){
      updateQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = queryString.stringifyUrl({
      url:'/',
      query: updateQuery
    },{skipNull:true});
    
    setStep(STEPS.LOCATION)
    searchModal.onClose()

    router.push(url);
  },[
    step,
    searchModal,
    guestCount,
    location,
    router,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLable = useMemo(() => {
    if(step === STEPS.INFO){
      return "Search"
    }
    return 'Next'
  }, [step])
  
  const secondaryActionLabel = useMemo(
    () => {
      if(step === STEPS.LOCATION){
        return undefined
      }

      return 'Back'
    },
    [step],
  )
  
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location'
      />
      <CountrySelect
        value={location}
        onChange={(value)=>setlocation(value as CountrySelectValue)}
      />
      <hr/>
      <Map center={location?.latlng}/>
    </div>
  )

  if(step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title='When do you wanna go?'
          subtitle='Make sure  everyone is free!'
        />
        <Calender
          value={dateRange}
          onChange={(value)=>setDateRange(value.selection)}
        />
      </div>
    )
  }

  if(step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title='More Information'
          subtitle='Find your perfect place!'
        />
        <Counter
          title='Guests'
          subtitle='How many guests are coming'
          value={guestCount}
          onChange={(value)=>setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms you need?'
          value={roomCount}
          onChange={(value)=>setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms you need ?'
          value={bathroomCount}
          onChange={(value)=>setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title='Filters'
        actionLable={actionLable}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
    />
  )
}

export default SearchModals
