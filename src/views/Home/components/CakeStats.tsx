import React from 'react'
import {CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'
import Card from '../../Card/Card'

const StyledCakeStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem;
`
const Box = styled.div`
  background: rgba(28, 25, 36, 0.8);
    height: auto;
    width: 18rem;
    padding: 2rem 0.1rem 2rem 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
    align-items: center;
    border-radius: 1rem;
    margin-top: 2rem;
    ${({ theme }) => theme.mediaQueries.sm} {
      min-height: 10rem;
      width: 20rem;
      padding: 2rem;
      margin-top: 0rem;
    }
`
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  ${({ theme }) => theme.mediaQueries.sm}{
    flex-direction: row;
    justify-content: space-between;
  align-items: center;
  }
`;

const Flex1 = styled.div`
   display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0rem;
  width: 65%;
  ${({ theme }) => theme.mediaQueries.sm}{
    flex-direction: row;
    margin-top: 2rem;
    justify-content: space-evenly;
  }
`;
// const Row = styled.div`
//   align-items: center;
//   display: flex;
//   font-size: 14px;
//   justify-content: space-between;
//   margin-bottom: 8px;
// `

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let eggPerBlock = 0;
  if(farms && farms[0] && farms[0].eggPerBlock){
    eggPerBlock = new BigNumber(farms[0].eggPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      
      <Flex>
        <Box>
          <Text fontSize="1.5rem">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="2rem" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Box>

        <Box>
          <Text fontSize="1.5rem">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="2rem" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Box>

        <Box>
          <Text fontSize="1.5rem">{TranslateString(538, 'Total Burned')}</Text>
          <CardValue fontSize="2rem" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Box>
      </Flex>

        <Flex1>
        <Box>
          <Text fontSize="1.5rem">{TranslateString(10004, 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="2rem" value={cakeSupply} decimals={0} />}
        </Box>

        <Box>
          <Text fontSize="1.5rem">{TranslateString(540, 'New EGG/block')}</Text>
          <Text bold fontSize="2rem">{eggPerBlock}</Text>
        </Box>
        </Flex1>

    </StyledCakeStats>
  )
}

export default CakeStats
