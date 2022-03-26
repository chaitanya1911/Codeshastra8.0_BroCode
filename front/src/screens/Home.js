import React from 'react';
import {
	Stack,
	Flex,
	Button,
	Text,
	VStack,
	useBreakpointValue,
} from '@chakra-ui/react';
import wholeImg from "../images/main-page-img.jpg";
import { Link } from 'react-router-dom';

const HomeComp = () => (
	<Flex
	w={'full'}
	h={'100vh'}
	backgroundImage={wholeImg}
	backgroundSize={'cover'}
	backgroundPosition={'center center'}>
	<VStack
		w={'full'}
		justify={'center'}
		px={useBreakpointValue({ base: 4, md: 8 })}
		bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
		<Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
			<Text
				color={'white'}
				fontWeight={700}
				lineHeight={1.2}
				fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
				Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
				eiusmod tempor
			</Text>
			<Stack direction={'row'}>
				<Link to={'/login'}>
				<Button
					bg={'blue.400'}
					rounded={'full'}
					color={'white'}
					_hover={{ bg: 'blue.500' }}>
					Sign In
				</Button>
				</Link>
				{/* <Button
					bg={'whiteAlpha.300'}
					rounded={'full'}
					color={'white'}
					_hover={{ bg: 'whiteAlpha.500' }}>
					Show me more
				</Button> */}
			</Stack>
		</Stack>
	</VStack>
</Flex>
)

const Home = () => {
	return (
		<>
			<HomeComp />
		</>
	)
}

export default Home