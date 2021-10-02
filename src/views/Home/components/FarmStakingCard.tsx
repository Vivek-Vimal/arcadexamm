import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button,Flex,Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { motion } from 'framer-motion'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'

const StyledFarmStakingCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Block = styled.div`
  background-color: rgba(0, 2, 52, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 15rem;
  width: 90%;
  padding: 2rem 2rem 1rem 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaQueries.sm}{
    min-height: 15rem;
    width: 25rem;
    margin-top: 0rem;
  }
`
const Box = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  flex-direction: column;
  align-items: center;
 
  ${({ theme }) => theme.mediaQueries.sm}{
    flex-direction: row;
    
  }
`;

// const CardImage = styled.img`
//   margin-bottom: 16px;
// `

// const Label = styled.div`
//   color: ${({ theme }) => theme.colors.textSubtle};
//   font-size: 14px;
// `

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <div style={{display:"flex",alignItems:"flex-start",width:"100%"}}>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
      </div>  
        {/* <motion.div
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 2.5, repeat: Infinity ,delay: 5}}
            
       style={{width:"4rem"}} >
          <CardImage src="/images/egg/2.png" alt="cake logo" width={64} height={64} />
        </motion.div> */}
        <Box>
        <Block>
          <img src="/images/circle.png" alt="" style={{position:"absolute",marginBottom:"15.5rem",width:"5rem"}}/>
          <Text fontSize="1.4rem">{TranslateString(544, 'EGG to Harvest')}</Text>
          <Flex alignItems="center">
          <CakeHarvestBalance earningsSum={earningsSum}/>
          <Text style={{marginLeft:"1rem"}}>~${(eggPrice * earningsSum).toFixed(2)}</Text>
          </Flex>
        </Block>
        <Block>
          <img src="/images/circle.png" alt="" style={{position:"absolute",marginBottom:"15.5rem",width:"5rem"}}/>
          <Text fontSize="1.4rem" mb="1rem">{TranslateString(546, 'EGG in Wallet')}</Text>
          <Flex alignItems="center">
          <CakeWalletBalance cakeBalance={cakeBalance} />
          <Text style={{marginLeft:"1rem"}}>~${(eggPrice * cakeBalance).toFixed(2)}</Text>
          </Flex>
        </Block>
        </Box>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting EGG')
                : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton  />
          )}
        </Actions>
     
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
