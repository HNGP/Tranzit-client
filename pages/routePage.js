import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { Button, 
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalFooter,
        ModalBody,
        ModalCloseButton,
        Slide,
        Box, 
        VStack } from '@chakra-ui/react'
import { sortedLastIndex, truncate } from 'lodash'


export default function RoutePage() {
    const [modalOpen , setModalOpen] = useState(false)
    const [slideOpen, setSlideOpen] = useState(true)
    const [stations, setStations] = useState([
           {
            "id": 1,
            "title": "Adarsh Nagar",
            "connected": [2],
            "details": {
                "line": ["yellow"],
                "layout": "Elevated",
                "longitude": 77.169385,
                "latitude": 28.718104
            }
        },
        {
            "id": 2,
            "title": "AIIMS", 
            "connected": [1],
            "details": {
                "line": "yellow",
                "layout": "Underground",
                "longitude": 77.20771,
                "latitude": 28.56892
            }
        }
    ])

    

    const onClose = () => {
        setModalOpen(false)
    }

  return (
   <div>
     <Modal isOpen={modalOpen} onClose={()=>setModalOpen(false)}>
         <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>bruh</h1>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>setModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
     </Modal>
  
  <Slide direction="top" in={slideOpen} style={{ zIndex: 10, marginLeft:'150px' }}>
    {stations.map((element, index) => {
         return(   
         <Box  
            p="10px"
            color={element.details.line}
            mt="4"
            fontSize="40px"
            width="80%"
            bg="teal.500"
            rounded="md"
            shadow="md">
                <p> {element.title}</p>
            </Box>
         )
    })}

   </Slide>

   </div>
  
  )
}
