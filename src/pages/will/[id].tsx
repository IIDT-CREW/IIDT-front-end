import dynamic from 'next/dynamic'

const Will = dynamic(() => import('views/Will'))

const WillPage = () => {
  return <Will />
}

export default WillPage
