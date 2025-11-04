
import React from 'react'
import Videocase from '../../components/videos/Videocase/Videocase'
import Lukospay from '../../components/Lukospay/Lukospay'
import Playstore from '../../components/content/Playstore/Playstore'
import Divisor from '../../components/ui/Divisor/Divisor'
import Busca from '../../components/search/Busca/Busca'
import { SpotlightPreview } from '../../components/ui/SpotlightPreview/SpotlightPreview'

const Lukospos = () => {
  return (
      <>
      <SpotlightPreview />
    <Videocase />

     <Lukospay />
      
     <Playstore />

        
       <Divisor />
     
     <Example />
    
     <Busca />
           
    </>
  )
}

export default Lukospos;