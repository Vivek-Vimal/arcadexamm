import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import { motion } from 'framer-motion'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import Title from 'views/Title/Title'
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import Card from '../Card/Card'

// const Hero = styled.div`
//   align-items: center;
//   background-image: url('/images/mobile.png');
//   background-size: 100% 14rem;
//   background-repeat: no-repeat;
//   background-position: top center;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   margin: auto;
//   margin-bottom: 32px;
//   padding-top: 15rem;
//   text-align: center;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     background-image: url('/images/left.png'), url('/images/right.png');
//     background-position: left center, right center;
//     background-size: 10rem 100%;
//     height: 165px;
//     padding-top: 0;
//   }
// `

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0.1rem;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 2rem;
  }
`;


const Main = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`
const T = styled.p`
    font-size: 1.2rem;
    font-weight: 450;
    color: #FFF;
${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1.5rem;
}
`
const Right = styled.div`
${({ theme }) => theme.mediaQueries.sm} {
  width: 30%;
  margin-top: 3rem;
 
  }
  width: 100%;
  margin-top: 2rem;
  
`;

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page style={{background:"#000"}}>
      <Heading size="xl" mb="1rem">ARCADEX</Heading>
      <T >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</T>
      <Main>
      <Left >
        <CakeStats />
        <FarmStakingCard />
        <TotalValueLockedCard />
      </Left>
      <Right>
        <TwitterCard/>
      </Right>  
      </Main>
      {/* <Hero>
        <Title />
        <Text>{TranslateString(578, 'Top 3 best DEFI app on Binance Smart Chain.')}</Text>
      </Hero>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 4}}
        // whileHover={{scale: 1.1}}
        // animate={{
        //   scale: [1, 2, 2, 1, 1],
        //   rotate: [0, 0, 270, 270, 0],
        //   borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        // }}
        // animate={{ rotate: 360 }}
        //         transition={{ duration: 0.5 }}
      >
        <Cards>
          <FarmStakingCard />
          <TwitterCard/>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </motion.div> */}
    </Page>
  )
}

export default Home
