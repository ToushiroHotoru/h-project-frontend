import manga from "../../styles/components/MangaList.module.css";
import Image from "next/image";
import { Flex, Box, Tag, HStack, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

export default function MangaList({ data }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [galleryExtended, setGalleryExtended] = useState(false);
	const onLoadHandler = () => {
		setIsLoaded(true);
	};

	return (
		<Skeleton isLoaded={isLoaded}>
			<Flex
				className={manga.list}
				align='center'>
				<Flex
					h='250px'
					justify='center'
					align='center'
					className={manga.image_wrap}>
					onMouseEnter=
					{() => {
						setGalleryExtended(true);
					}}
					{[4, 5, 6].map((_, i) => {
						return (
							<Box
								key={i + 1}
								className={`${manga.image}`}>
								<Image
									onLoad={onLoadHandler}
									src={`/manga_cover/cover_${_}.jpg`}
									alt='pic'
									layout='intrinsic'
									width={160}
									height={200}
								/>
							</Box>
						);
					})}
					{/* <Box>
						<Image
							onLoad={onLoadHandler}
							src='/manga_cover/cover_6.jpg'
							alt='pic'
							layout='intrinsic'
							width={160}
							height={200}
						/>
					</Box> */}
				</Flex>

				<Flex
					direction='column'
					h='200px'
					className={manga.info}>
					<Flex w='100%'>
						<Box
							fontSize='18px'
							w='100px'>
							Название
						</Box>
						<Box
							fontSize='18px'
							w='100px'>
							{data.title}
						</Box>
					</Flex>
					<Flex>
						<Box w='100px'>Серия</Box>
						<Box w='80px'>{data.series}</Box>
					</Flex>
					<Flex>
						<Box w='100px'>Автор</Box>
						<Box w='80px'>{data.artist}</Box>
					</Flex>

					<Flex>
						<Box
							minW='100px'
							verticalAlign='center'>
							Теги:
						</Box>
						<HStack w='100%'>
							{data.tags.map((tag, i) => {
								return (
									<Tag
										key={i + 1}
										variant='solid'
										colorScheme='dark '>
										{tag}
									</Tag>
								);
							})}
						</HStack>
					</Flex>
				</Flex>
			</Flex>
		</Skeleton>
	);
}
