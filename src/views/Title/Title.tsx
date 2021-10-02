import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const HoverPage = styled.div`
@-webkit-keyframes hvr-buzz {
    50% {
      -webkit-transform: translateX(3px) rotate(2deg);
      transform: translateX(3px) rotate(2deg);
    }
    100% {
      -webkit-transform: translateX(-3px) rotate(-2deg);
      transform: translateX(-3px) rotate(-2deg);
    }
  }
  @keyframes hvr-buzz {
    50% {
      -webkit-transform: translateX(3px) rotate(2deg);
      transform: translateX(3px) rotate(2deg);
    }
    100% {
      -webkit-transform: translateX(-3px) rotate(-2deg);
      transform: translateX(-3px) rotate(-2deg);
    }
  }
  
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  
    &:hover, &:focus, &:active {
    -webkit-animation-name: hvr-buzz;
    animation-name: hvr-buzz;
    -webkit-animation-duration: 0.15s;
    animation-duration: 0.15s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  
  
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    // box-shadow: 0 0 1px blue;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: box-shadow;
    transition-property: box-shadow;
  
  &:hover, &:focus, &:active {
    box-shadow: 0 0 2rem  ${({ theme }) => theme.colors.secondary};
  }
  cursor: grab;


  display: block;

  border-radius: 12px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 6s ease infinite;


@keyframes gradient {
  0% {
      background-position: 0% 50%;
  }
  50% {
      background-position: 100% 50%;
  }
  100% {
      background-position: 0% 50%;
  }
}
}

`;

const Color = styled.div`
  color: ${({ theme }) => theme.colors.title};
` 

const Title = () => {
  const TranslateString = useI18n()
  const x = useMotionValue(0);
const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
    return (
        <HoverPage>
          <motion.h1 
          whileTap={{ scale: 0.9 }} drag='x' style={{ x, opacity ,cursor:"grab",fontSize:"4rem",padding:"0.7rem 1rem 1rem 1rem" }}
           >
            <Color> {TranslateString(576, 'Goose Finance')}</Color>
          </motion.h1>
        </HoverPage>
    )
}

export default Title
